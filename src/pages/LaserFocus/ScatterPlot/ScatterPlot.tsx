import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useCallback } from 'react';
import styles from './ScatterPlot.module.css';

const PROXY_PATH = '/api/laser-focus-form';

// Animation constants
const INITIAL_ANIMATION_DELAY = 100;
const ENTER_ANIMATION_DURATION = 500;
const HOVER_TRANSITION_DURATION = 150;
const CLICK_TRANSITION_DURATION = 200;

// Opacity constants
const NODE_OPACITY = 0.18;
const TEXT_OPACITY = 0.95;

// Fetch and polling constants
const FETCH_LIMIT = 500;
const TIMESTAMP_POLLING_INTERVAL = 2000;
const TIMESTAMP_POLLING_INTERVAL_ON_FOCUS = 3000;

// Cursor smoothing
const LERP_FACTOR = 0.25;

interface FormConfig {
  question: string;
  xAxisTitle: string;
  yAxisTitle: string;
  xAxisLabel1: string;
  xAxisLabel2: string;
  xAxisLabel3: string;
  yAxisLabel1: string;
  yAxisLabel2: string;
  yAxisLabel3: string;
  xAxisQuestion?: string;
  yAxisQuestion?: string;
}

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
  const timestamp = String(r.Timestamp ?? r.timestamp ?? '');
  const table = Number(r.table);
  const idea = String(r.idea ?? '');
  const impact = Number(r.impact);
  const effort = Number(r.effort);
  if (Number.isNaN(table) || Number.isNaN(impact) || Number.isNaN(effort)) return null;
  return { timestamp, table, idea, impact, effort };
};

const isSameDataPoint = (a: DataPoint | null, b: DataPoint | null): boolean => {
  if (!a || !b) return false;
  return a.timestamp === b.timestamp && a.table === b.table && a.impact === b.impact && a.effort === b.effort;
};

const ScatterPlot: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  // Keep a mirror of the latest data for diffing new rows on full fetch
  const dataRef = useRef<DataPoint[]>([]);
  
  // Form configuration from Input sheet
  const [config, setConfig] = useState<FormConfig>({
    question: '',
    xAxisTitle: '',
    yAxisTitle: '',
    xAxisLabel1: '',
    xAxisLabel2: '',
    xAxisLabel3: '',
    yAxisLabel1: '',
    yAxisLabel2: '',
    yAxisLabel3: ''
  });
  const [configLoading, setConfigLoading] = useState(true);

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
  const consecutiveErrorsRef = useRef<number>(0);
  const forceFullFetchRef = useRef<boolean>(false);

  const [pointsVisible, setPointsVisible] = useState(true);

  const [initialAnimating, setInitialAnimating] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [focusedNode, setFocusedNode] = useState<DataPoint | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<DataPoint | null>(null);

  const [liveStatus, setLiveStatus] = useState<{ lastUpdated: number; rowCount: number }>({
    lastUpdated: 0,
    rowCount: 0,
  });

  const newRowsRef = useRef<Set<string>>(new Set());
  const renderedNodesRef = useRef<Set<string>>(new Set());
  const lastKnownTimestampRef = useRef<number>(0);
  const initialLoadCompleteRef = useRef<boolean>(false);
  const pendingInitialAnimationsRef = useRef<number>(0);

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

    setLayersReady(true);
  }, []);

  const NODE_RADIUS = 18;
  const NODE_HOVER_RADIUS = 22;
  const NODE_EDGE_PADDING = NODE_HOVER_RADIUS + 6;

  const margin = useMemo(
    () => ({
      top: 100 + NODE_EDGE_PADDING,
      right: 150 + NODE_EDGE_PADDING,
      bottom: 80 + NODE_EDGE_PADDING,
      left: 120 + NODE_EDGE_PADDING,
    }),
    [NODE_EDGE_PADDING]
  );
  const { width, height } = dimensions;
  const x = useMemo(() => d3.scaleLinear().domain([0, 10]).range([margin.left, width - margin.right]), [width, margin]);
  const y = useMemo(() => d3.scaleLinear().domain([0, 10]).range([height - margin.bottom, margin.top]), [height, margin]);

  const jitterRadiusPx = 10;
  const keyForPoint = (d: DataPoint) => `${d.timestamp}|${d.table}|${d.impact}|${d.effort}`;
  const hash32 = (str: string) => {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  const jitterOffset = useCallback((d: DataPoint): [number, number] => {
    const h = hash32(keyForPoint(d));
    const hx = (h & 0xffff) / 0xffff;
    const hy = ((h >>> 16) & 0xffff) / 0xffff;
    const angle = hx * Math.PI * 2;
    const radius = (0.2 + 0.8 * hy) * jitterRadiusPx;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  }, []);

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
      .attr('stroke', 'none');

    const gridX = axes
      .append('g')
      .attr('class', 'grid grid--x')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
      );
    
    gridX.selectAll('line')
      .attr('stroke', '#ffffff')
      .attr('stroke-opacity', 0.08);
    
    gridX.select('path').remove(); // Remove axis path (border line)

    const gridY = axes
      .append('g')
      .attr('class', 'grid grid--y')
      .attr('transform', `translate(${margin.left},0)`) 
      .call(
        d3
          .axisLeft(y)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      );
    
    gridY.selectAll('line')
      .attr('stroke', '#ffffff')
      .attr('stroke-opacity', 0.08);
    
    gridY.select('path').remove(); // Remove axis path (border line)

    // Bottom border line (drawn after grid to appear on top)
    axes
      .append('line')
      .attr('x1', margin.left)
      .attr('y1', height - margin.bottom)
      .attr('x2', width - margin.right)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Left border line (drawn after grid to appear on top)
    axes
      .append('line')
      .attr('x1', margin.left)
      .attr('y1', margin.top)
      .attr('x2', margin.left)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // X-axis segment labels (3 measures)
    axes
      .append('text')
      .attr('x', x(2.25)) // Left (center of 1-3.5 range)
      .attr('y', height - margin.bottom + 30)
      .attr('text-anchor', 'middle')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500')
      .text(config.xAxisLabel1);

    axes
      .append('text')
      .attr('x', x(5.5)) // Middle (center of 3.5-7.5 range)
      .attr('y', height - margin.bottom + 30)
      .attr('text-anchor', 'middle')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500')
      .text(config.xAxisLabel2);

    axes
      .append('text')
      .attr('x', x(8.75)) // Right (center of 7.5-10 range)
      .attr('y', height - margin.bottom + 30)
      .attr('text-anchor', 'middle')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500')
      .text(config.xAxisLabel3);

    // X-axis title at the right end
    axes
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', `translate(${width - margin.right + 20}, ${height - margin.bottom})`)
      .attr('text-anchor', 'start')
      .style('fill', 'white')
      .style('font-size', '32px')
      .text(config.xAxisTitle);

    // Y-axis segment labels (3 measures)
    axes
      .append('text')
      .attr('x', margin.left - 20)
      .attr('y', y(2.25)) // Bottom (center of 1-3.5 range)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500')
      .text(config.yAxisLabel1);

    axes
      .append('text')
      .attr('x', margin.left - 20)
      .attr('y', y(5.5)) // Middle (center of 3.5-7.5 range)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500')
      .text(config.yAxisLabel2);

    axes
      .append('text')
      .attr('x', margin.left - 20)
      .attr('y', y(8.75)) // Top (center of 7.5-10 range)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .style('fill', '#E6F2EF')
      .style('font-size', '16px')
      .style('font-weight', '500')
      .text(config.yAxisLabel3);

    // Y-axis title at the top
    axes
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', `translate(${margin.left - 30}, ${margin.top - 20})`)
      .attr('text-anchor', 'start')
      .style('fill', 'white')
      .style('font-size', '32px')
      .text(config.yAxisTitle);
  }, [layersReady, x, y, width, height, margin, config]);

  const initialLoad = async () => {
    try {
      const res = await fetch(`${PROXY_PATH}?limit=${FETCH_LIMIT}&format=obj&_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      const body = (await res.json()) as unknown;

      console.log('[DEBUG] Raw body:', body);
      console.log('[DEBUG] Body is array?', Array.isArray(body));

      const rawRows: unknown[] = Array.isArray(body)
        ? (body as unknown[])
        : Array.isArray((body as Record<string, unknown>).rows)
        ? ((body as Record<string, unknown>).rows as unknown[])
        : [];
      const serverCount = Array.isArray(body)
        ? rawRows.length
        : Number((body as Record<string, unknown>).lastRow) || rawRows.length;

      console.log('[DEBUG] Raw rows count:', rawRows.length);
      console.log('[DEBUG] First row sample:', rawRows[0]);
      console.log('[DEBUG] First row keys:', rawRows[0] ? Object.keys(rawRows[0] as Record<string, unknown>) : 'no keys');
      console.log('[DEBUG] Second row sample:', rawRows[1]);

      const points: DataPoint[] = rawRows
        .map(parseRowToDataPoint)
        .filter((d): d is DataPoint => d !== null);

      lastRowRef.current = serverCount + 1;
      arrayLenRef.current = points.length;
      console.log('[DEBUG] Initial load - points:', points.length);
      console.log('[DEBUG] First parsed point:', points[0]);
      
      // Mark all initial points for animation
      points.forEach(d => {
        newRowsRef.current.add(keyForPoint(d));
      });
      
      setData(points);
      setLiveStatus({ lastUpdated: Date.now(), rowCount: points.length });
      // Don't set initialAnimating to false here - let render complete handle it
    } catch (err) {
      console.error('Initial load error:', err);
    }
  };

  const fetchIncremental = useCallback(async () => {
    const processFullArray = (full: unknown[]) => {
      const serverCount = full.length;
      // Map all rows once
      const fullPoints: DataPoint[] = full
        .map(parseRowToDataPoint)
        .filter((d): d is DataPoint => d !== null);

      const key = (d: DataPoint) => `${d.timestamp}-${d.table}-${d.impact}-${d.effort}`;
      const existing = new Set((dataRef.current || []).map(key));
      const incomingNew = fullPoints.filter(d => !existing.has(key(d)));

      if (incomingNew.length > 0) {
        // Mark new rows for animation
        incomingNew.forEach(d => {
          newRowsRef.current.add(keyForPoint(d));
        });
        setData(prev => [...prev, ...incomingNew]);
        setLiveStatus({ lastUpdated: Date.now(), rowCount: (dataRef.current?.length || 0) + incomingNew.length });
        arrayLenRef.current = Math.max(arrayLenRef.current + incomingNew.length, serverCount);
      } else {
        arrayLenRef.current = Math.max(arrayLenRef.current, serverCount);
      }

      lastRowRef.current = serverCount + 1;
    };

    const fallbackFullFetch = async (ac: AbortController) => {
      const fullRes = await fetch(`${PROXY_PATH}?format=obj&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
      if (!fullRes.ok) throw new Error(`Full fetch error: ${fullRes.status}`);
      const payload = (await fullRes.json()) as unknown;
      let rows: unknown[] | null = null;
      if (Array.isArray(payload)) {
        rows = payload as unknown[];
      } else if (payload && typeof payload === 'object' && Array.isArray((payload as { rows?: unknown[] }).rows)) {
        rows = (payload as { rows?: unknown[] }).rows || null;
      }
      if (!rows) {
        throw new Error('Full fetch returned non-array.');
      }
      processFullArray(rows);
    };

    try {
      if (inflightRef.current) {
        return;
      }
      const ac = new AbortController();
      inflightRef.current = ac;

      if (forceFullFetchRef.current) {
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }

      const metaRes = await fetch(`${PROXY_PATH}?meta=1&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
      if (!metaRes.ok) {
        forceFullFetchRef.current = true;
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }
      const metaBody = (await metaRes.json()) as unknown;

      if (!Array.isArray(metaBody) && (typeof (metaBody as Record<string, unknown>).lastRow !== 'number' || isNaN(Number((metaBody as Record<string, unknown>).lastRow)))) {
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }

      if (Array.isArray(metaBody)) {
        if (forceFullFetchRef.current) {
          forceFullFetchRef.current = false;
        }
        processFullArray(metaBody);
        consecutiveErrorsRef.current = 0;
        return;
      }

      const serverLastRow = Number((metaBody as Record<string, unknown>).lastRow) || 0;
      if (forceFullFetchRef.current) {
        forceFullFetchRef.current = false;
      }
      if (serverLastRow <= lastRowRef.current) {
        await fallbackFullFetch(ac);
        consecutiveErrorsRef.current = 0;
        return;
      }

      const sinceRow = lastRowRef.current + 1;
      const incRes = await fetch(`${PROXY_PATH}?sinceRow=${sinceRow}&limit=${FETCH_LIMIT}&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
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

      if (newPoints.length) {
        // Mark new rows for animation
        newPoints.forEach(d => {
          newRowsRef.current.add(keyForPoint(d));
        });
        setData(prev => [...prev, ...newPoints]);
        setLiveStatus({ lastUpdated: Date.now(), rowCount: arrayLenRef.current + newPoints.length });
      }
      lastRowRef.current = Number((payload as { lastRow?: unknown })?.lastRow) || serverLastRow;
      arrayLenRef.current += newPoints.length;
      consecutiveErrorsRef.current = 0;
    } catch (err) {
      if ((err as Error & { name?: string })?.name === 'AbortError') return;
      consecutiveErrorsRef.current += 1;
    } finally {
      inflightRef.current = null;
    }
  }, []);

  const checkForChanges = useCallback(async () => {
    try {
      const res = await fetch(`${PROXY_PATH}?action=timestamp&_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      
      const body = await res.json();
      const serverTimestamp = Number(body.timestamp) || 0;
      
      // If timestamp has changed, fetch new data
      if (serverTimestamp > lastKnownTimestampRef.current) {
        console.log('[DEBUG] Timestamp changed, fetching new data:', serverTimestamp);
        lastKnownTimestampRef.current = serverTimestamp;
        await fetchIncremental();
      }
    } catch (err) {
      console.error('Timestamp check error:', err);
    }
  }, [fetchIncremental]);

  useEffect(() => {
    let canceled = false;
    const boot = async () => {
      // Load config first
      try {
        const configRes = await fetch(`${PROXY_PATH}?action=config`);
        if (configRes.ok) {
          const cfg = await configRes.json();
          if (!cfg.error) {
            setConfig(cfg);
          }
        }
      } catch (err) {
        console.error('Failed to load config:', err);
      } finally {
        setConfigLoading(false);
      }
      
      if (!initialFetchDone.current) {
        await initialLoad();
        if (canceled) return;
        initialFetchDone.current = true;
        
        // Get initial timestamp
        try {
          const res = await fetch(`${PROXY_PATH}?action=timestamp&_t=${Date.now()}`, { cache: 'no-store' });
          if (res.ok) {
            const body = await res.json();
            lastKnownTimestampRef.current = Number(body.timestamp) || 0;
          }
        } catch (err) {
          console.error('Initial timestamp fetch error:', err);
        }
      }
    };
    boot();
    return () => {
      canceled = true;
      if (pollIdRef.current) window.clearInterval(pollIdRef.current);
      inflightRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pollIdRef.current) window.clearInterval(pollIdRef.current);
    checkForChanges();
    pollIdRef.current = window.setInterval(() => {
      checkForChanges();
    }, TIMESTAMP_POLLING_INTERVAL);
    return () => {
      if (pollIdRef.current) window.clearInterval(pollIdRef.current);
    };
  }, [checkForChanges]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        checkForChanges();
        if (pollIdRef.current) window.clearInterval(pollIdRef.current);
        pollIdRef.current = window.setInterval(() => {
          checkForChanges();
        }, TIMESTAMP_POLLING_INTERVAL_ON_FOCUS);
      }
    };
    const onFocus = () => {
      checkForChanges();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  }, [checkForChanges]);

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
      pos.x += (target.x - pos.x) * LERP_FACTOR;
      pos.y += (target.y - pos.y) * LERP_FACTOR;
      const hover = el.classList.contains('cursor--hover');
      const scale = hover ? 1.25 : 1.0;
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
      .attr('transform', `translate(${x(0)}, ${y(0)})`)
      .style('opacity', 0);

    nodesEnter
      .append('circle')
      .attr('r', NODE_RADIUS)
      .style('fill', '#5FFFE3')
      .attr('stroke', '#E6F2EF')
      .attr('stroke-opacity', 0.25)
      .attr('stroke-width', 1);

    nodesEnter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '18px')
      .style('font-weight', '600')
      .style('letter-spacing', '0.2px')
      .style('fill', '#F8FFFD')
      .text((d) => d.table.toString());

    const nodesMerge = nodesEnter.merge(nodes);

    nodesMerge
      .on('mouseenter', (event, d: DataPoint) => {
        d3.select(event.currentTarget).raise();
        d3.select(event.currentTarget).select('circle').transition().duration(HOVER_TRANSITION_DURATION).attr('r', NODE_HOVER_RADIUS);
        d3.select(event.currentTarget).select('text').transition().duration(HOVER_TRANSITION_DURATION).style('font-size', '20px');
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
        d3.select(event.currentTarget).select('circle').transition().duration(HOVER_TRANSITION_DURATION).attr('r', NODE_RADIUS);
        d3.select(event.currentTarget).select('text').transition().duration(HOVER_TRANSITION_DURATION).style('font-size', '18px');
        const tip = d3.select(tooltipRef.current);
        tip.style('opacity', 0)
           .style('transform', 'translate(-9999px, -9999px)');
      })
      .on('click', (_, d: DataPoint) => {
        const isCurrentlyFocused = isSameDataPoint(focusedNode, d);
        
        if (isCurrentlyFocused) {
          setFocusedNode(null);
          const allNodes = gPoints.selectAll('g.node');
          allNodes.each(function() {
            const node = d3.select(this);
            node.select('circle').transition().duration(CLICK_TRANSITION_DURATION).style('opacity', pointsVisible ? NODE_OPACITY : 0);
            node.select('text').transition().duration(CLICK_TRANSITION_DURATION).style('opacity', pointsVisible ? TEXT_OPACITY : 0);
          });
        } else {
          setFocusedNode(d);
          const allNodes = gPoints.selectAll('g.node');
          allNodes.each(function(nodeData) {
            const node = d3.select(this);
            const isClickedNode = isSameDataPoint(nodeData as DataPoint, d);
            
            if (!isClickedNode) {
              node.select('circle').transition().duration(CLICK_TRANSITION_DURATION).style('opacity', 0);
              node.select('text').transition().duration(CLICK_TRANSITION_DURATION).style('opacity', 0);
            } else {
              node.select('circle').transition().duration(CLICK_TRANSITION_DURATION).style('opacity', NODE_OPACITY);
              node.select('text').transition().duration(CLICK_TRANSITION_DURATION).style('opacity', 1);
            }
          });
        }
      });

    nodesMerge.select('text').text((d) => d.table.toString());

    // Handle entering nodes - track rendered nodes to prevent re-animation
    let animationIndex = 0;
    let animationsStarted = 0;
    const isInitialLoad = !initialLoadCompleteRef.current;
    
    nodesEnter.each(function(d) {
      const pointKey = keyForPoint(d);
      const [jx, jy] = jitterOffset(d);
      
      // Check if this node was already rendered (should never re-animate)
      if (renderedNodesRef.current.has(pointKey)) {
        // This shouldn't happen, but if it does, just show it instantly
        d3.select(this)
          .attr('transform', `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`)
          .style('opacity', 1);
        d3.select(this).select('circle')
          .style('opacity', pointsVisible ? NODE_OPACITY : 0);
        d3.select(this).select('text')
          .style('opacity', pointsVisible ? TEXT_OPACITY : 0);
        return;
      }
      
      // Check if this node should be animated (new addition)
      const shouldAnimate = newRowsRef.current.has(pointKey);
      
      if (shouldAnimate) {
        // Animate this node
        animationsStarted++;
        
        // If this is part of initial load, increment counter
        if (isInitialLoad) {
          pendingInitialAnimationsRef.current++;
        }
        
        d3.select(this)
          .transition()
          .duration(ENTER_ANIMATION_DURATION)
          .delay(animationIndex * INITIAL_ANIMATION_DELAY)
          .attr('transform', `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`)
          .style('opacity', 1)
          .on('end', () => {
            // Remove from new rows tracking and add to rendered tracking
            newRowsRef.current.delete(pointKey);
            renderedNodesRef.current.add(pointKey);
            
            // If this was part of initial load, decrement counter
            if (isInitialLoad) {
              pendingInitialAnimationsRef.current--;
              // When ALL initial animations are complete, mark initial load done
              if (pendingInitialAnimationsRef.current === 0) {
                initialLoadCompleteRef.current = true;
                setInitialAnimating(false);
              }
            }
          });
        
        d3.select(this).select('circle')
          .transition()
          .duration(ENTER_ANIMATION_DURATION)
          .delay(animationIndex * INITIAL_ANIMATION_DELAY)
          .style('opacity', pointsVisible ? NODE_OPACITY : 0);
        
        d3.select(this).select('text')
          .transition()
          .duration(ENTER_ANIMATION_DURATION)
          .delay(animationIndex * INITIAL_ANIMATION_DELAY)
          .style('opacity', pointsVisible ? TEXT_OPACITY : 0);
        
        animationIndex++;
      } else {
        // Show instantly (no animation) - shouldn't normally happen
        d3.select(this)
          .attr('transform', `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`)
          .style('opacity', 1);
        d3.select(this).select('circle')
          .style('opacity', pointsVisible ? NODE_OPACITY : 0);
        d3.select(this).select('text')
          .style('opacity', pointsVisible ? TEXT_OPACITY : 0);
        
        // Still add to rendered nodes
        renderedNodesRef.current.add(pointKey);
      }
    });
    
    // If no animations started and we have data, mark initial load complete immediately
    if (animationsStarted === 0 && data.length > 0 && isInitialLoad) {
      initialLoadCompleteRef.current = true;
      setInitialAnimating(false);
    }

    // Update existing nodes positions (only nodes that already exist, not entering ones)
    // In D3, after .enter(), the original selection is the update selection
    // But we need to make sure we're not updating nodes that are being animated
    const nodesUpdate = nodes.filter(function(d) {
      const pointKey = keyForPoint(d);
      // Only update nodes that are already rendered (not in enter selection)
      return renderedNodesRef.current.has(pointKey);
    });
    
    if (!initialAnimating) {
      nodesUpdate
        .attr('transform', (d) => {
          const [jx, jy] = jitterOffset(d);
          return `translate(${x(d.effort) + jx}, ${y(d.impact) + jy})`;
        })
        .style('opacity', 1);
      nodesUpdate.select('circle').style('opacity', pointsVisible ? NODE_OPACITY : 0);
      nodesUpdate.select('text').style('opacity', pointsVisible ? TEXT_OPACITY : 0);
    }

    nodes.exit().remove();

    prevCount.current = data.length;
  }, [layersReady, data, x, y, height, margin, pointsVisible, initialAnimating, jitterOffset, focusedNode]);

  useEffect(() => {
    const gPoints = d3.select(pointsGRef.current);
    gPoints.selectAll('g.node').each(function () {
      const node = d3.select(this);
      node.select('circle').style('opacity', pointsVisible ? NODE_OPACITY : 0);
      node.select('text').style('opacity', pointsVisible ? TEXT_OPACITY : 0);
    });
  }, [pointsVisible, data]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
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
      }
      if (e.key === 'Escape') {
        setShowPopup(false);
        setPopupData(null);
        setSearchTerm('');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pointsVisible, focusedNode]);

  return (
    <div className={styles.container}>
      {configLoading && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
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
              if (Number.isFinite(val)) {
                const found = data.find(d => d.table === val);
                if (found) {
                  setPopupData(found);
                  setShowPopup(true);
                }
              }
            }
          }}
          className={styles.searchInput}
        />
        <button
          className={styles.searchBtn}
          onClick={() => {
            const val = Number(searchTerm.trim());
            if (Number.isFinite(val)) {
              const found = data.find(d => d.table === val);
              if (found) {
                setPopupData(found);
                setShowPopup(true);
              }
            }
          }}
        >
          Go
        </button>
        <button
          className={styles.clearBtn}
          onClick={() => {
            setSearchTerm('');
            setShowPopup(false);
            setPopupData(null);
          }}
        >
          Clear
        </button>
      </div>
      <div ref={cursorRef} className={styles.cursor} />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        width="95%"
        height="90%"
        preserveAspectRatio="xMidYMid meet"
      />
      {showPopup && popupData && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupIdea}>{popupData.idea}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;