import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useCallback } from 'react';
import styles from './ScatterPlot.module.css';


const PROXY_PATH = '/api/laser-focus-form';
const API_KEY = import.meta.env.VITE_GOOGLE_APPSCRIPT_API_KEY as string;

interface DataPoint {
  timestamp: string;
  table: number;
  idea: string;
  impact: number;
  effort: number;
}

const parseRowToDataPoint = (row: unknown): DataPoint | null => {
  if (!row || typeof row !== 'object') return null;
  const r = row as Record<string, unknown>;
  const timestamp = String(r.timestamp ?? '');
  const table = Number(r.table);
  const idea = String(r.idea ?? '');
  const impact = Number(r.impact);
  const effort = Number(r.effort);
  if (Number.isNaN(table) || Number.isNaN(impact) || Number.isNaN(effort)) return null;
  return { timestamp, table, idea, impact, effort };
};

const ScatterPlot: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  // Keep a mirror of the latest data for diffing new rows on full fetch
  const dataRef = useRef<DataPoint[]>([]);

  // Keep dataRef in sync with state for robust diffing
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [layersReady, setLayersReady] = useState(false);

  
  const svgRef = useRef<SVGSVGElement>(null);
  const axesGRef = useRef<SVGGElement | null>(null);
  const pointsGRef = useRef<SVGGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  
  const initialFetchDone = useRef(false);

  
  const lastRowRef = useRef<number>(0);
  const arrayLenRef = useRef<number>(0);
  const pollIdRef = useRef<number | null>(null);
  const inflightRef = useRef<AbortController | null>(null);
  // Track consecutive polling errors for simple backoff
  const consecutiveErrorsRef = useRef<number>(0);
  // If true, bypass meta/incremental and always full-fetch
  const forceFullFetchRef = useRef<boolean>(false);

  
  const [pointsVisible, setPointsVisible] = useState(true);

  
  const [initialAnimating, setInitialAnimating] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedTable, setSearchedTable] = useState<number | null>(null);

  // Simple live status for debugging and visibility-triggered refetches
  const [liveStatus, setLiveStatus] = useState<{ lastUpdated: number; rowCount: number }>({
    lastUpdated: 0,
    rowCount: 0,
  });

  
  const initialAnimAppliedRef = useRef(false);

  // Stats snapshot (highest/lowest effort/impact)
  const stats = useMemo(() => {
    if (!data.length) {
      return [
        { key: 'Highest Effort', value: undefined as number | undefined, items: [] as DataPoint[] },
        { key: 'Highest Impact', value: undefined as number | undefined, items: [] as DataPoint[] },
        { key: 'Lowest Effort', value: undefined as number | undefined, items: [] as DataPoint[] },
        { key: 'Lowest Impact', value: undefined as number | undefined, items: [] as DataPoint[] },
      ];
    }
    const maxEffort = d3.max(data, d => d.effort);
    const maxImpact = d3.max(data, d => d.impact);
    const minEffort = d3.min(data, d => d.effort);
    const minImpact = d3.min(data, d => d.impact);
    return [
      { key: 'Highest Effort', value: maxEffort, items: data.filter(d => d.effort === maxEffort) },
      { key: 'Highest Impact', value: maxImpact, items: data.filter(d => d.impact === maxImpact) },
      { key: 'Lowest Effort', value: minEffort, items: data.filter(d => d.effort === minEffort) },
      { key: 'Lowest Impact', value: minImpact, items: data.filter(d => d.impact === minImpact) },
    ];
  }, [data]);

  
  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    let root = svg.select<SVGGElement>('g.root');
    if (root.empty()) {
      root = svg.append('g').attr('class', 'root');
      
      axesGRef.current = root.append('g').attr('class', 'axes-layer').node() as SVGGElement;
      
      pointsGRef.current = root.append('g').attr('class', 'points-layer').node() as SVGGElement;
      root.append('g').attr('class', 'interaction-layer');
    } else {
      
      axesGRef.current = root.select<SVGGElement>('g.axes-layer').node();
      pointsGRef.current = root.select<SVGGElement>('g.points-layer').node();
      if (root.select('g.interaction-layer').empty()) {
        root.append('g').attr('class', 'interaction-layer');
      }
    }

    
    const defsSel = root.select('defs');
    if (defsSel.empty()) {
      const defsNew = root.append('defs');
      
      const grad = defsNew
        .append('radialGradient')
        .attr('id', 'pointGradient')
        .attr('cx', '50%')
        .attr('cy', '50%');
      grad.append('stop').attr('offset', '0%').attr('stop-color', '#5FFFE3').attr('stop-opacity', 1);
      grad.append('stop').attr('offset', '100%').attr('stop-color', '#0E7B69').attr('stop-opacity', 1);

      
      const glow = defsNew.append('filter').attr('id', 'softGlow').attr('filterUnits', 'userSpaceOnUse');
      glow.append('feGaussianBlur').attr('stdDeviation', 6).attr('result', 'coloredBlur');
      const feMerge = glow.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    }

    setLayersReady(true);
  }, []);

  
  // Shared node sizing and extra padding so circles don't bleed out of the plot
  const NODE_RADIUS = 18;
  const NODE_HOVER_RADIUS = 22;
  const NODE_EDGE_PADDING = NODE_HOVER_RADIUS + 6; // a bit extra beyond hover size

  const margin = useMemo(
    () => ({
      top: 20 + NODE_EDGE_PADDING,
      right: 20 + NODE_EDGE_PADDING,
      bottom: 60 + NODE_EDGE_PADDING,
      left: 80 + NODE_EDGE_PADDING,
    }),
    [NODE_EDGE_PADDING]
  );
  const { width, height } = dimensions;
  const x = useMemo(() => d3.scaleLinear().domain([0, 10]).range([margin.left, width - margin.right]), [width, margin]);
  const y = useMemo(() => d3.scaleLinear().domain([0, 10]).range([height - margin.bottom, margin.top]), [height, margin]);

  // Deterministic micro-jitter to reduce visual overlap without changing values
  const jitterRadiusPx = 10;
  const keyForPoint = (d: DataPoint) => `${d.timestamp}|${d.table}|${d.impact}|${d.effort}`;
  const hash32 = (str: string) => {
    let h = 2166136261 >>> 0; // FNV-1a base
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  const jitterOffset = useCallback((d: DataPoint): [number, number] => {
    const h = hash32(keyForPoint(d));
    const hx = (h & 0xffff) / 0xffff; // 0..1
    const hy = ((h >>> 16) & 0xffff) / 0xffff; // 0..1
    const angle = hx * Math.PI * 2;
    const radius = (0.2 + 0.8 * hy) * jitterRadiusPx; // avoid piling all at center
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  }, []);

  // Apply visual highlight to searched table number
  useEffect(() => {
    if (!pointsGRef.current) return;
    const gPoints = d3.select(pointsGRef.current);
    const nodesSel = gPoints.selectAll<SVGGElement, DataPoint>('g.node');
    // If search cleared, fully reset styles for all nodes
    if (searchedTable == null) {
      nodesSel.select('circle.highlight-ring').remove();
      nodesSel.select('circle')
        .transition()
        .duration(150)
        .attr('r', NODE_RADIUS)
        .attr('stroke', '#E6F2EF')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.25);
      nodesSel.select('text').transition().duration(150).style('font-size', '18px');
      return;
    }
    nodesSel.each(function (d) {
      const node = d3.select(this);
      const circle = node.select('circle');
      const isMatch = searchedTable != null && d.table === searchedTable;
      if (isMatch) {
        node.raise();
        circle
          .transition()
          .duration(150)
          .attr('r', NODE_HOVER_RADIUS + 4)
          .attr('stroke', '#5FFFE3')
          .attr('stroke-width', 3)
          .attr('stroke-opacity', 1);

        // Add or update a static highlight ring for extra vivid focus
        let ring = node.select<SVGCircleElement>('circle.highlight-ring');
        if (ring.empty()) {
          // Insert before the main circle so text remains on top
          ring = node.insert('circle', 'circle')
            .attr('class', 'highlight-ring')
            .attr('fill', 'none');
        }
        ring
          .attr('r', NODE_HOVER_RADIUS + 10)
          .attr('stroke', '#5FFFE3')
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.75)
          .attr('filter', 'url(#softGlow)');

        // Emphasize label
        node.select('text').transition().duration(150).style('font-size', '22px');
      } else {
        circle
          .transition()
          .duration(150)
          .attr('r', NODE_RADIUS)
          .attr('stroke', '#E6F2EF')
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.25);
        node.select('circle.highlight-ring').remove();
        node.select('text').transition().duration(150).style('font-size', '18px');
      }
    });
  }, [searchedTable, data]);

  
  useEffect(() => {
    if (!layersReady) return;
    const axes = d3.select(axesGRef.current);
    if (axes.empty()) return;

    
    axes.selectAll('*').remove();

    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Plot background panel (theme polish)
    axes
      .append('rect')
      .attr('class', 'plot-bg')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'rgba(255,255,255,0.03)')
      .attr('stroke', 'rgba(255,255,255,0.08)')
      .attr('rx', 8)
      .attr('ry', 8);

    axes
      .append('g')
      .attr('class', 'grid grid--x')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#ffffff')
      .attr('stroke-opacity', 0.08);

    axes
      .append('g')
      .attr('class', 'grid grid--y')
      .attr('transform', `translate(${margin.left},0)`) 
      .call(
        d3
          .axisLeft(y)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#ffffff')
      .attr('stroke-opacity', 0.08);

    
    axes
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    
    axes
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 2 + 16)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '24px')
      .text('Effort');

    
    axes
      .append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(${margin.left},0)`) 
      .call(d3.axisLeft(y));

    
    axes
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', `translate(${margin.left / 2}, ${height / 2}) rotate(-90)`) 
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '24px')
      .text('Impact');

    
    axes.selectAll('g.axis text')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500');

    axes.selectAll('g.axis path, g.axis line')
      .attr('stroke', '#A7D9D0')
      .attr('stroke-opacity', 0.3);
  }, [layersReady, x, y, width, height, margin]);

  
  const initialLoad = async () => {
    try {
      const res = await fetch(`${PROXY_PATH}?key=${API_KEY}&limit=500&_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      const body = (await res.json()) as unknown;

      const rawRows: unknown[] = Array.isArray(body)
        ? (body as unknown[])
        : Array.isArray((body as Record<string, unknown>).rows)
        ? ((body as Record<string, unknown>).rows as unknown[])
        : [];
      const serverCount = Array.isArray(body)
        ? rawRows.length
        : Number((body as Record<string, unknown>).lastRow) || rawRows.length;

      const points: DataPoint[] = rawRows
        .map(parseRowToDataPoint)
        .filter((d): d is DataPoint => d !== null);

      // Track sheet row index (header included)
      lastRowRef.current = serverCount + 1;
      arrayLenRef.current = points.length;
      console.log('[InitialLoad] Loaded points:', points.length, points);
      setData(points);
      setLiveStatus({ lastUpdated: Date.now(), rowCount: points.length });
      // If nothing to animate, start polling immediately
      if (points.length === 0) {
        setInitialAnimating(false);
      }
    } catch (err) {
      console.error('Initial load error:', err);
    }
  };

  const fetchIncremental = async () => {
    // allow fetching even during initial animation; rendering guards prevent clobbering
    console.log('[FetchIncremental] tick, initialAnimating=', initialAnimating, 'arrayLen=', arrayLenRef.current, 'lastRow=', lastRowRef.current);
    // Helper: process a full array payload
    const processFullArray = (full: unknown[]) => {
      const serverCount = full.length;
      // Map all rows once
      const fullPoints: DataPoint[] = full
        .map(parseRowToDataPoint)
        .filter((d): d is DataPoint => d !== null);

      // Build stable keys for existing & incoming data (match D3 join)
      const key = (d: DataPoint) => `${d.timestamp}-${d.table}-${d.impact}-${d.effort}`;
      const existing = new Set((dataRef.current || []).map(key));
      const incomingNew = fullPoints.filter(d => !existing.has(key(d)));

      console.log('[ProcessFullArray] serverCount:', serverCount, 'arrayLenRef:', arrayLenRef.current, 'incomingNew:', incomingNew.length);

      if (incomingNew.length > 0) {
        // Append only truly new rows (wherever they appear in the sheet)
        setData(prev => [...prev, ...incomingNew]);
        setLiveStatus({ lastUpdated: Date.now(), rowCount: (dataRef.current?.length || 0) + incomingNew.length });
        arrayLenRef.current = Math.max(arrayLenRef.current + incomingNew.length, serverCount);
      } else {
        // No brand-new rows detected; keep our current data but sync counters to server
        arrayLenRef.current = Math.max(arrayLenRef.current, serverCount);
      }

      // Track sheet last row index (header included)
      lastRowRef.current = serverCount + 1;
    };
    // Keep lastChecksumRef on the function (optional, not used elsewhere)
    (processFullArray as unknown as { lastChecksumRef?: { current: number } }).lastChecksumRef =
      (processFullArray as unknown as { lastChecksumRef?: { current: number } }).lastChecksumRef || { current: 0 };

    // Helper: best‑effort full fetch fallback (used when meta endpoint fails)
    const fallbackFullFetch = async (ac: AbortController) => {
      const fullRes = await fetch(`${PROXY_PATH}?key=${API_KEY}&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
      if (!fullRes.ok) throw new Error(`Full fetch error: ${fullRes.status}`);
      const payload = (await fullRes.json()) as unknown;
      // Accept either a plain array or an object with a 'rows' array
      let rows: unknown[] | null = null;
      if (Array.isArray(payload)) {
        rows = payload as unknown[];
      } else if (payload && typeof payload === 'object' && Array.isArray((payload as { rows?: unknown[] }).rows)) {
        rows = (payload as { rows?: unknown[] }).rows || null;
      }
      if (!rows) {
        throw new Error('Full fetch returned non-array.');
      }
      console.log('[FallbackFullFetch] Full fetch accepted rows:', rows.length);
      processFullArray(rows);
    };

    try {
      // If a request is already in flight, skip this tick (avoid aborting our own fetch)
      if (inflightRef.current) {
        console.log('[FetchIncremental] skipped tick: request in flight');
        return;
      }
      const ac = new AbortController();
      inflightRef.current = ac;

      // If we've flipped into force-full-fetch mode, bypass meta/incremental
      if (forceFullFetchRef.current) {
        console.log('[FetchIncremental] Force full-fetch mode: ON');
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }

      // try lightweight meta probe first
      const metaRes = await fetch(`${PROXY_PATH}?key=${API_KEY}&meta=1&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
      if (!metaRes.ok) {
        // Meta endpoint is unhappy (e.g., 500) — switch into force full-fetch mode
        forceFullFetchRef.current = true;
        console.warn('[FetchIncremental] Meta probe failed, forcing full-fetch mode. Status:', metaRes.status);
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }
      const metaBody = (await metaRes.json()) as unknown;

      // If meta probe returns OK but the body isn’t an array and doesn’t contain a numeric lastRow, fall back to a full fetch
      if (!Array.isArray(metaBody) && (typeof (metaBody as Record<string, unknown>).lastRow !== 'number' || isNaN(Number((metaBody as Record<string, unknown>).lastRow)))) {
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }

      // If server just returns the full array, process it
      if (Array.isArray(metaBody)) {
        if (forceFullFetchRef.current) {
          console.log('[FetchIncremental] Meta healthy again, turning force full-fetch mode OFF.');
          forceFullFetchRef.current = false;
        }
        console.log('[FetchIncremental] Meta returned full array, length:', metaBody.length);
        processFullArray(metaBody);
        consecutiveErrorsRef.current = 0;
        return;
      }

      // Incremental path using lastRow
      const serverLastRow = Number((metaBody as Record<string, unknown>).lastRow) || 0;
      console.log('[Incremental] serverLastRow=', serverLastRow, 'local lastRowRef=', lastRowRef.current);
      if (forceFullFetchRef.current) {
        console.log('[FetchIncremental] Meta healthy again, turning force full-fetch mode OFF.');
        forceFullFetchRef.current = false;
      }
      if (serverLastRow <= lastRowRef.current) {
        console.log('[FetchIncremental] No new rows, forcing full refresh.');
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }

      const sinceRow = lastRowRef.current + 1;
      const incRes = await fetch(`${PROXY_PATH}?key=${API_KEY}&sinceRow=${sinceRow}&limit=500&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
      if (!incRes.ok) throw new Error(`Inc fetch error: ${incRes.status}`);
      const payload = (await incRes.json()) as unknown;
      const rawRows: unknown[] = Array.isArray((payload as { rows?: unknown[] })?.rows)
        ? (((payload as { rows?: unknown[] }).rows as unknown[]) || [])
        : Array.isArray(payload)
        ? ((payload as unknown[]) || [])
        : [];

      const newPoints: DataPoint[] = rawRows
        .map(parseRowToDataPoint)
        .filter((d): d is DataPoint => d !== null);

      console.log('[FetchIncremental] Incremental new points:', newPoints.length, newPoints);
      if (newPoints.length) setData(prev => [...prev, ...newPoints]);
      if (newPoints.length) setLiveStatus({ lastUpdated: Date.now(), rowCount: arrayLenRef.current + newPoints.length });
      lastRowRef.current = Number((payload as { lastRow?: unknown })?.lastRow) || serverLastRow;
      arrayLenRef.current += newPoints.length;
      consecutiveErrorsRef.current = 0;
    } catch (err) {
      // Ignore deliberate aborts; otherwise log a concise warning (avoid dumping secrets)
      if ((err as Error & { name?: string })?.name === 'AbortError') return;
      console.warn('Incremental fetch warning (will retry):', (err as Error)?.message || err);
      consecutiveErrorsRef.current += 1;
    } finally {
      // Allow the next polling tick to start a new request
      inflightRef.current = null;
    }
  };

  
  useEffect(() => {
    let canceled = false;
    const boot = async () => {
      if (!initialFetchDone.current) {
        await initialLoad();
        if (canceled) return;
        initialFetchDone.current = true;
        // Kick one fetch right away so we don't wait for the first interval tick
        fetchIncremental();
      }
      
    };
    boot();
    return () => {
      canceled = true;
      if (pollIdRef.current) window.clearInterval(pollIdRef.current);
      inflightRef.current?.abort();
    };
  // Intentionally run only on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pollIdRef.current) window.clearInterval(pollIdRef.current);
    // Run one fetch immediately, then continue on an interval
    fetchIncremental();
    console.log('[Polling] started (mount)');
    pollIdRef.current = window.setInterval(() => {
      fetchIncremental();
    }, 1000);
    return () => {
      if (pollIdRef.current) window.clearInterval(pollIdRef.current);
    };
  // Intentionally run only on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the tab becomes visible or window regains focus, fetch immediately and refresh the polling timer.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        fetchIncremental();
        if (pollIdRef.current) window.clearInterval(pollIdRef.current);
        pollIdRef.current = window.setInterval(() => {
          fetchIncremental();
        }, 2000);
        console.log('[Polling] restarted (visibilitychange)');
      }
    };
    const onFocus = () => {
      fetchIncremental();
      console.log('[Polling] tick on focus');
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  // Intentionally run only on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Custom cursor: minimal ring + RAF follow (smooth & light)
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    let raf = 0;
    const pos = { x: -9999, y: -9999 };
    const target = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      // simple smoothing (lerp)
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      const hover = el.classList.contains('cursor--hover');
      const scale = hover ? 1.25 : 1.0;
      // center a 14px ring on the pointer and scale on hover
      el.style.transform = `translate(${pos.x - 7}px, ${pos.y - 7}px) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  
  const prevCount = useRef(0);
  useEffect(() => {
    if (!layersReady) return;
    if (!pointsGRef.current) return;
    const gPoints = d3.select(pointsGRef.current);

    const nodes = gPoints
      .selectAll<SVGGElement, DataPoint>('g.node')
      .data(data, (d: DataPoint) => `${d.timestamp}-${d.table}-${d.impact}-${d.effort}`);

    const nodesEnter = nodes
      .enter()
      .append('g')
      .attr('class', 'node')
      // Enter at (0,0) and invisible
      .attr('transform', `translate(${x(0)}, ${y(0)})`)
      .style('opacity', 0);

    // Log enter/update selection sizes for debugging
    console.log('[D3] enter size:', nodesEnter.size(), 'update size:', nodes.size());

    // Log before rendering new nodes
    console.log('[D3] Rendering nodes, total data points:', data.length);

    nodesEnter
      .append('circle')
      .attr('r', NODE_RADIUS)
      .style('fill', 'url(#pointGradient)')
      // Remove immediate opacity assignment; fade in via transition
      //.style('opacity', pointsVisible ? 0.18 : 0)
      .attr('stroke', '#E6F2EF')
      .attr('stroke-opacity', 0.25)
      .attr('stroke-width', 1)
      .attr('filter', 'url(#softGlow)');

    nodesEnter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '18px')
      .style('font-weight', '600')
      .style('letter-spacing', '0.2px')
      .style('fill', '#F8FFFD')
      // Remove immediate opacity assignment; fade in via transition
      //.style('opacity', pointsVisible ? 0.95 : 0)
      .text((d) => d.table.toString());

    const nodesMerge = nodesEnter.merge(nodes);

    nodesMerge
      .on('mouseenter', (event, d: DataPoint) => {
        // Bring hovered node to front for readability
        d3.select(event.currentTarget).raise();
        d3.select(event.currentTarget).select('circle').transition().duration(150).attr('r', NODE_HOVER_RADIUS);
        d3.select(event.currentTarget).select('text').transition().duration(150).style('font-size', '20px');
        const tip = d3.select(tooltipRef.current);
        tip.style('opacity', 1)
           .text(d.idea || '(no idea)');
        d3.select(cursorRef.current).classed('cursor--hover', true);
      })
      .on('mousemove', (event) => {
        const tip = d3.select(tooltipRef.current);
        const padding = 12;
        const xPos = event.pageX + padding;
        const yPos = event.pageY + padding;
        tip.style('transform', `translate(${xPos}px, ${yPos}px)`);
      })
      .on('mouseleave', (event) => {
        d3.select(cursorRef.current).classed('cursor--hover', false);
        d3.select(event.currentTarget).select('circle').transition().duration(150).attr('r', NODE_RADIUS);
        d3.select(event.currentTarget).select('text').transition().duration(150).style('font-size', '18px');
        const tip = d3.select(tooltipRef.current);
        tip.style('opacity', 0)
           .style('transform', 'translate(-9999px, -9999px)');
      });

    nodesMerge.select('text').text((d) => d.table.toString());

    if (prevCount.current === 0 && data.length > 0) {
      if (initialAnimAppliedRef.current) {
        return; 
      }
      initialAnimAppliedRef.current = true;
      const T_INIT = d3.transition('init-stagger');
      let pending = nodesMerge.size();
      // Animate all nodes (initial load) from (0,0) to their positions, fade in
      nodesMerge
        .transition(T_INIT)
        .duration(500)
        .delay((_, i) => i * 100)
        .attr('transform', (d) => {
          const [jx, jy] = jitterOffset(d);
          return `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`;
        })
        .style('opacity', 1)
        .on('end', () => {
          pending--;
          if (pending === 0) {
            setInitialAnimating(false); 
          }
        });
      // Animate shape and text opacity for initial load
      nodesEnter.select('circle')
        .transition(T_INIT)
        .duration(500)
        .delay((_, i) => i * 100)
        .style('opacity', pointsVisible ? 0.18 : 0);
      nodesEnter.select('text')
        .transition(T_INIT)
        .duration(500)
        .delay((_, i) => i * 100)
        .style('opacity', pointsVisible ? 0.95 : 0);
    } else {
      // Animate only entering nodes from (0,0) to their correct position and fade in
      nodesEnter
        .transition()
        .duration(500)
        .delay((_, i) => i * 100) // match initial stagger cadence
        .attr('transform', (d) => {
          const [jx, jy] = jitterOffset(d);
          return `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`;
        })
        .style('opacity', 1);
      // Animate circle and text opacity for entering nodes
      nodesEnter.select('circle')
        .transition()
        .duration(500)
        .delay((_, i) => i * 100)
        .style('opacity', pointsVisible ? 0.18 : 0);
      nodesEnter.select('text')
        .transition()
        .duration(500)
        .delay((_, i) => i * 100)
        .style('opacity', pointsVisible ? 0.95 : 0);

      if (!initialAnimating) {
        nodes
          .transition()
          .duration(0)
          .attr('transform', (d) => {
            const [jx, jy] = jitterOffset(d);
            return `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`;
          })
          .style('opacity', 1);
      }
    }

    nodes.exit().remove();

    prevCount.current = data.length;
  }, [layersReady, data, x, y, height, margin, pointsVisible, initialAnimating, jitterOffset]);

  
  useEffect(() => {
    const gPoints = d3.select(pointsGRef.current);
    gPoints.selectAll('g.node').each(function () {
      const node = d3.select(this);
      node.select('circle').style('opacity', pointsVisible ? 0.18 : 0);
      node.select('text').style('opacity', pointsVisible ? 0.95 : 0);
    });
  }, [pointsVisible, data]);

  // Remove empty effect block

    // Keyboard shortcut: press 'H' to toggle point opacity
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // avoid toggling while typing in inputs/textareas/contenteditable
      const t = e.target as HTMLElement | null;
      const isTyping =
        !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable === true);
      if (isTyping) return;

      if (e.key && e.key.toLowerCase() === 'h') {
        setPointsVisible(v => !v);
      }
      if (e.key && e.key.toLowerCase() === 's') {
        setShowStats(v => !v);
      }
      if (e.key && e.key.toLowerCase() === 'c') {
        setSearchTerm('');
        setSearchedTable(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.liveBadge}>
        Live: {initialAnimating ? 'booting…' : 'polling'} · Rows: {liveStatus.rowCount} · Updated: {liveStatus.lastUpdated ? new Date(liveStatus.lastUpdated).toLocaleTimeString() : '—'}
      </div>
      {showStats && (
      <div className={styles.statsCard}>
        <div className={styles.statsTitle}> Stats </div>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.key} className={styles.statRow}>
              <div className={styles.statLabel}>{s.key}</div>
              <div className={styles.statValue}>{s.value ?? '—'}</div>
              <div className={styles.statItems}>
                {s.items.slice(0, 3).map((d, idx) => (
                  <span key={`${s.key}-${idx}`} className={styles.badge}>{d.table}</span>
                ))}
                {s.items.length > 3 ? <span className={styles.more}>+{s.items.length - 3}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      <div ref={tooltipRef} className={styles.tooltip} />
      <div className={styles.searchBar}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Find table # (e.g., 12)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = Number(searchTerm.trim());
              setSearchedTable(Number.isFinite(val) ? val : null);
            }
          }}
          className={styles.searchInput}
        />
        <button
          className={styles.searchBtn}
          onClick={() => {
            const val = Number(searchTerm.trim());
            setSearchedTable(Number.isFinite(val) ? val : null);
          }}
        >
          Go
        </button>
        <button
          className={styles.clearBtn}
          onClick={() => {
            setSearchTerm('');
            setSearchedTable(null);
          }}
        >
          Clear
        </button>
      </div>
      <div ref={cursorRef} className={styles.cursor} />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        width="80%"
        height="80%"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default ScatterPlot;