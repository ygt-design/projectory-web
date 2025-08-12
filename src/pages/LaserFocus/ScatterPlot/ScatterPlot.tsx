import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';


const PROXY_PATH = '/api/laser-focus-form';
const API_KEY = import.meta.env.VITE_GOOGLE_APPSCRIPT_API_KEY as string;

interface DataPoint {
  timestamp: string;
  table: number;
  idea: string;
  impact: number;
  effort: number;
}

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

  // Simple live status for debugging and visibility-triggered refetches
  const [liveStatus, setLiveStatus] = useState<{ lastUpdated: number; rowCount: number }>({
    lastUpdated: 0,
    rowCount: 0,
  });

  
  const initialAnimAppliedRef = useRef(false);

  
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
    } else {
      
      axesGRef.current = root.select<SVGGElement>('g.axes-layer').node();
      pointsGRef.current = root.select<SVGGElement>('g.points-layer').node();
    }

    
    let defs = root.select('defs');
    if (defs.empty()) {
      defs = root.append('defs');
      
      const grad = defs
        .append('radialGradient')
        .attr('id', 'pointGradient')
        .attr('cx', '50%')
        .attr('cy', '50%');
      grad.append('stop').attr('offset', '0%').attr('stop-color', '#5FFFE3').attr('stop-opacity', 1);
      grad.append('stop').attr('offset', '100%').attr('stop-color', '#0E7B69').attr('stop-opacity', 1);

      
      const glow = defs.append('filter').attr('id', 'softGlow').attr('filterUnits', 'userSpaceOnUse');
      glow.append('feGaussianBlur').attr('stdDeviation', 6).attr('result', 'coloredBlur');
      const feMerge = glow.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    }

    setLayersReady(true);
  }, []);

  
  const margin = useMemo(() => ({ top: 20, right: 20, bottom: 60, left: 80 }), []);
  const { width, height } = dimensions;
  const x = useMemo(() => d3.scaleLinear().domain([0, 10]).range([margin.left, width - margin.right]), [width, margin]);
  const y = useMemo(() => d3.scaleLinear().domain([0, 10]).range([height - margin.bottom, margin.top]), [height, margin]);

  
  useEffect(() => {
    if (!layersReady) return;
    const axes = d3.select(axesGRef.current);
    if (axes.empty()) return;

    
    axes.selectAll('*').remove();

    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

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
      const body = await res.json();

      const rawRows: any[] = Array.isArray(body) ? body : Array.isArray(body.rows) ? body.rows : [];
      const serverCount = Array.isArray(body) ? rawRows.length : Number(body.lastRow) || rawRows.length;

      const points: DataPoint[] = rawRows
        .map((row: any) => ({
          timestamp: String(row.timestamp),
          table: Number(row.table),
          idea: String(row.idea ?? ''),
          impact: Number(row.impact),
          effort: Number(row.effort),
        }))
        .filter((d: DataPoint) => !isNaN(d.table) && !isNaN(d.impact) && !isNaN(d.effort));

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
    const processFullArray = (full: any[]) => {
      const serverCount = full.length;
      // Map all rows once
      const fullPoints: DataPoint[] = full
        .map((row: any) => ({
          timestamp: String(row.timestamp),
          table: Number(row.table),
          idea: String(row.idea ?? ''),
          impact: Number(row.impact),
          effort: Number(row.effort),
        }))
        .filter((d: DataPoint) => !isNaN(d.table) && !isNaN(d.impact) && !isNaN(d.effort));

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
    // Keep lastChecksumRef on the function
    (processFullArray as any).lastChecksumRef = (processFullArray as any).lastChecksumRef || { current: 0 };

    // Helper: best‑effort full fetch fallback (used when meta endpoint fails)
    const fallbackFullFetch = async (ac: AbortController) => {
      const fullRes = await fetch(`${PROXY_PATH}?key=${API_KEY}&_t=${Date.now()}`, { signal: ac.signal, cache: 'no-store' });
      if (!fullRes.ok) throw new Error(`Full fetch error: ${fullRes.status}`);
      const full = await fullRes.json();
      console.log('[FallbackFullFetch] Full fetch returned rows:', full.length);
      if (!Array.isArray(full)) throw new Error('Full fetch returned non-array.');
      processFullArray(full);
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
      const metaBody = await metaRes.json();

      // If meta probe returns OK but the body isn’t an array and doesn’t contain a numeric lastRow, fall back to a full fetch
      if (!Array.isArray(metaBody) && (typeof metaBody.lastRow !== 'number' || isNaN(Number(metaBody.lastRow)))) {
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
      const serverLastRow = Number(metaBody.lastRow) || 0;
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
      const body = await incRes.json();
      const rawRows: any[] = Array.isArray(body.rows) ? body.rows : [];

      const newPoints: DataPoint[] = rawRows
        .map((row: any) => ({
          timestamp: String(row.timestamp),
          table: Number(row.table),
          idea: String(row.idea ?? ''),
          impact: Number(row.impact),
          effort: Number(row.effort),
        }))
        .filter((d: DataPoint) => !isNaN(d.table) && !isNaN(d.impact) && !isNaN(d.effort));

      console.log('[FetchIncremental] Incremental new points:', newPoints.length, newPoints);
      if (newPoints.length) setData(prev => [...prev, ...newPoints]);
      if (newPoints.length) setLiveStatus({ lastUpdated: Date.now(), rowCount: arrayLenRef.current + newPoints.length });
      lastRowRef.current = Number(body.lastRow) || serverLastRow;
      arrayLenRef.current += newPoints.length;
      consecutiveErrorsRef.current = 0;
    } catch (err) {
      // Ignore deliberate aborts; otherwise log a concise warning (avoid dumping secrets)
      if ((err as any)?.name === 'AbortError') return;
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
      .data(data, (d: any) => `${d.timestamp}-${d.table}-${d.impact}-${d.effort}`);

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
      .attr('r', 18)
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

    const nodesMerge = nodesEnter.merge(nodes as any);

    nodesMerge
      .on('mouseenter', (event, d: DataPoint) => {
        d3.select(event.currentTarget).select('circle').transition().duration(150).attr('r', 22);
        d3.select(event.currentTarget).select('text').transition().duration(150).style('font-size', '20px');
        const tip = d3.select(tooltipRef.current);
        tip.style('opacity', 1)
           .text(d.idea || '(no idea)');
        d3.select(cursorRef.current).classed('cursor--hover', true);
      })
      .on('mousemove', (event, d: DataPoint) => {
        const tip = d3.select(tooltipRef.current);
        const padding = 12;
        const xPos = event.pageX + padding;
        const yPos = event.pageY + padding;
        tip.style('transform', `translate(${xPos}px, ${yPos}px)`);
      })
      .on('mouseleave', (event) => {
        d3.select(cursorRef.current).classed('cursor--hover', false);
        d3.select(event.currentTarget).select('circle').transition().duration(150).attr('r', 18);
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
        .attr('transform', (d) => `translate(${x(d.effort)}, ${y(d.impact)})`)
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
        .attr('transform', (d) => `translate(${x(d.effort)}, ${y(d.impact)})`)
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
          .attr('transform', (d) => `translate(${x(d.effort)}, ${y(d.impact)})`)
          .style('opacity', 1);
      }
    }

    nodes.exit().remove();

    prevCount.current = data.length;
  }, [layersReady, data, x, y, height, margin]);

  
  useEffect(() => {
    const gPoints = d3.select(pointsGRef.current);
    gPoints.selectAll('g.node').each(function () {
      const node = d3.select(this);
      node.select('circle').style('opacity', pointsVisible ? 0.18 : 0);
      node.select('text').style('opacity', pointsVisible ? 0.95 : 0);
    });
  }, [pointsVisible, data]);

  useEffect(() => {
    if (data.length > 0 && prevCount.current === 0) {
    }
  }, [data]);

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
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(1200px 800px at 20% 10%, rgba(21, 134, 113, 0.25), transparent 60%), radial-gradient(1000px 700px at 80% 90%, rgba(0, 255, 202, 0.18), transparent 60%), #0F1115',
        textRendering: 'optimizeLegibility',
        color: 'white',
        zIndex: 10000,
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          padding: '6px 10px',
          borderRadius: 8,
          fontSize: 12,
          color: '#CFEDEA',
          background: 'rgba(15, 17, 21, 0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 10002,
        }}
      >
        Live: {initialAnimating ? 'booting…' : 'polling'} · Rows: {liveStatus.rowCount} · Updated: {liveStatus.lastUpdated ? new Date(liveStatus.lastUpdated).toLocaleTimeString() : '—'}
      </div>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          left: 0,
          top: 0,
          transform: 'translate(-9999px, -9999px)',
          padding: '8px 10px',
          background: 'rgba(15,17,21,0.9)',
          color: '#EAF8F5',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
          fontSize: 12,
          lineHeight: 1.3,
          maxWidth: 260,
          zIndex: 10003,
          whiteSpace: 'normal',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)'
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10005,
          transform: 'translate(-9999px, -9999px) scale(1)',
          background: 'transparent',
          border: '1.5px solid rgba(95,255,227,0.9)',
          boxShadow: 'none',
          willChange: 'transform',
        }}
        className="custom-cursor"
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        width="75%"
        height="75%"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default ScatterPlot;