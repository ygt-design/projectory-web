import React, { useState, useEffect, useRef } from 'react';
import styles from './LaserFocusForm.module.css';

const PROXY_PATH = '/api/laser-focus-form';

// Form validation and slider constants
const MAX_SLIDER_VALUE = 10;
const MIN_SLIDER_VALUE = 0;
const SLIDER_STEP = 0.1;
const MAX_WORD_COUNT = 25;

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
}

interface ResponseRow {
  Timestamp: string;
  table: number;
  idea: string;
  impact: number;
  effort: number;
}

// Fetch form configuration from Input sheet
async function fetchConfig(): Promise<FormConfig> {
  const res = await fetch(`${PROXY_PATH}?action=config`);
  if (!res.ok) throw new Error(`Error fetching config: ${res.status}`);
  const json = await res.json();
  if (json.error) {
    console.error('Config error from server:', json.error);
    throw new Error(json.error);
  }
  return json;
}

// Fetch all submitted rows
async function fetchResponses(): Promise<ResponseRow[]> {
  const res = await fetch(PROXY_PATH);
  if (!res.ok) throw new Error(`Error fetching data: ${res.status}`);
  return res.json();
}

// Submit a new response (tolerant of varied success payloads)
async function submitResponse(payload: Omit<ResponseRow, 'Timestamp'>) {
  const res = await fetch(PROXY_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    // ignore JSON parse errors for empty bodies
  }
  // If server explicitly indicates an error, surface it
  if (json && (typeof json === 'object') && json !== null) {
    const obj = json as { error?: unknown; success?: unknown };
    if (obj.error || obj.success === false) {
      throw new Error(typeof obj.error === 'string' ? obj.error : 'Submission failed');
    }
  }
  return json;
}

const LaserFocusForm: React.FC = () => {
  // Step and form state
  const [step, setStep] = useState(1);
  const [table, setTable] = useState<number | ''>('');
  const [idea, setIdea] = useState('');
  const [impact, setImpact] = useState(5);
  const [timeToValue, setTimeToValue] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form configuration from Input sheet
  const [config, setConfig] = useState<FormConfig>({
    question: 'Which AI application or opportunity discussed today did your table find most exciting for CIBC?',
    xAxisTitle: 'time to value',
    yAxisTitle: 'impact',
    xAxisLabel1: 'Immediate',
    xAxisLabel2: '',
    xAxisLabel3: 'Long-Term',
    yAxisLabel1: 'Low',
    yAxisLabel2: '',
    yAxisLabel3: 'High'
  });
  const [configLoading, setConfigLoading] = useState(true);

  // Store fetched responses (reserved for future use)
  const [allResponses, setAllResponses] = useState<ResponseRow[]>([]);
  void allResponses; // keep variable for future without triggering unused warnings

  const formRef = useRef<HTMLDivElement>(null);
  const impactBoxRef = useRef<HTMLDivElement>(null);
  const timeToValueBoxRef = useRef<HTMLDivElement>(null);
  const isDraggingImpactRef = useRef(false);
  const isDraggingTimeToValueRef = useRef(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const valueFromPointer = (clientX: number, box: HTMLDivElement | null) => {
    if (!box) return null;
    const rect = box.getBoundingClientRect();
    const raw = (clientX - rect.left) / rect.width;
    const t = clamp(raw, 0, 1);
    const val = t * MAX_SLIDER_VALUE;
    const rounded = Math.round(val * 10) / 10;
    return rounded;
  };

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  // Load form configuration on mount
  useEffect(() => {
    fetchConfig()
      .then(cfg => {
        console.log('Config loaded:', cfg);
        setConfig(cfg);
        setConfigLoading(false);
      })
      .catch(err => {
        console.error('Fetch config error:', err);
        // Keep default config values if fetch fails
        setConfigLoading(false);
      });
  }, []);

  // Load existing submissions on mount
  useEffect(() => {
    fetchResponses()
      .then(res => {
        setAllResponses(res);
      })
      .catch(err => console.error('Fetch responses error:', err));
  }, []);

  // Validation per step
  const isValidStep = () => {
    switch (step) {
      case 1:
        return table !== '';
      case 2: {
        const wordCount = idea.trim().split(/\s+/).filter(w => w).length;
        return wordCount > 0 && wordCount <= MAX_WORD_COUNT;
      }
      case 3:
        return impact >= MIN_SLIDER_VALUE && impact <= MAX_SLIDER_VALUE;
      case 4:
        return timeToValue >= MIN_SLIDER_VALUE && timeToValue <= MAX_SLIDER_VALUE;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isValidStep()) setStep(s => s + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Map UI fields to backend schema:
      // - impact (step 3) → backend 'impact' field (y-axis on scatter plot)
      // - timeToValue (step 4) → backend 'effort' field (x-axis on scatter plot)
      await submitResponse({ 
        table: Number(table), 
        idea, 
        impact: impact,
        effort: timeToValue
      });
      setSubmitted(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    } catch (e) {
      const msg = (e as Error)?.message || '';
      // Some mobile browsers report network errors like 'Load failed' even when the
      // server processed the POST. In that case, optimistically show thank-you.
      if (/load failed|failed to fetch|network error/i.test(msg)) {
        setSubmitted(true);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
      } else {
        setError(msg || 'Submission failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div className={styles.thankYou}>Got it! Thanks for sharing.</div>;
  }

  if (configLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div ref={formRef} className={styles.formContainer}>
      {step === 1 && (
        <div className={styles.step}>
          <label>What's your table number?</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            placeholder="e.g., 12"
            value={table}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                setTable('');
              } else {
                // Enforce integers only
                const digits = val.replace(/\D+/g, '');
                setTable(digits === '' ? '' : Number(digits));
              }
            }}
            onKeyDown={(e) => {
              const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
              if (allowed.includes(e.key)) return;
              if (!/^[0-9]$/.test(e.key)) e.preventDefault();
            }}
            autoComplete="one-time-code"
            enterKeyHint="next"
            maxLength={4}
          />
        </div>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <label>{config.question}</label>
          <textarea
            maxLength={200}
            value={idea}
            onChange={e => setIdea(e.target.value)}
          />
          <div>
            {idea.trim().split(/\s+/).filter(w => w).length}/{MAX_WORD_COUNT} words
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <label>Drag to rate the estimated {config.yAxisTitle}… </label>
          <div
            ref={impactBoxRef}
            className={`${styles.sliderBox} ${styles.sliderBoxFull}`}
            onMouseDown={(e) => {
              e.preventDefault();
              isDraggingImpactRef.current = true;
              const val = valueFromPointer(e.clientX, impactBoxRef.current);
              if (val != null) setImpact(val);
            }}
            onMouseMove={(e) => {
              if (!isDraggingImpactRef.current) return;
              const val = valueFromPointer(e.clientX, impactBoxRef.current);
              if (val != null) setImpact(val);
            }}
            onMouseUp={() => { isDraggingImpactRef.current = false; }}
            onMouseLeave={() => { isDraggingImpactRef.current = false; }}
            onTouchStart={(e) => {
              e.preventDefault();
              isDraggingImpactRef.current = true;
              const t = e.touches[0];
              const val = valueFromPointer(t?.clientX ?? 0, impactBoxRef.current);
              if (val != null) setImpact(val);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              if (!isDraggingImpactRef.current) return;
              const t = e.touches[0];
              const val = valueFromPointer(t?.clientX ?? 0, impactBoxRef.current);
              if (val != null) setImpact(val);
            }}
            onTouchEnd={() => { isDraggingImpactRef.current = false; }}
          >
            <div className={styles.sliderFill} style={{ width: `${(impact / MAX_SLIDER_VALUE) * 100}%` }} />
            <div className={styles.sliderGlow} />
            <input
              className={styles.sliderInput}
              type="range"
              min={MIN_SLIDER_VALUE}
              max={MAX_SLIDER_VALUE}
              step={SLIDER_STEP}
              value={impact}
              onChange={e => setImpact(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles.sliderScale}>
            <span>{config.yAxisLabel1}</span>
            <span>{config.yAxisLabel3}</span>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <label>Drag to rate the estimated {config.xAxisTitle}… </label>
          <div
            ref={timeToValueBoxRef}
            className={`${styles.sliderBox} ${styles.sliderBoxFull}`}
            onMouseDown={(e) => {
              e.preventDefault();
              isDraggingTimeToValueRef.current = true;
              const val = valueFromPointer(e.clientX, timeToValueBoxRef.current);
              if (val != null) setTimeToValue(val);
            }}
            onMouseMove={(e) => {
              if (!isDraggingTimeToValueRef.current) return;
              const val = valueFromPointer(e.clientX, timeToValueBoxRef.current);
              if (val != null) setTimeToValue(val);
            }}
            onMouseUp={() => { isDraggingTimeToValueRef.current = false; }}
            onMouseLeave={() => { isDraggingTimeToValueRef.current = false; }}
            onTouchStart={(e) => {
              e.preventDefault();
              isDraggingTimeToValueRef.current = true;
              const t = e.touches[0];
              const val = valueFromPointer(t?.clientX ?? 0, timeToValueBoxRef.current);
              if (val != null) setTimeToValue(val);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              if (!isDraggingTimeToValueRef.current) return;
              const t = e.touches[0];
              const val = valueFromPointer(t?.clientX ?? 0, timeToValueBoxRef.current);
              if (val != null) setTimeToValue(val);
            }}
            onTouchEnd={() => { isDraggingTimeToValueRef.current = false; }}
          >
            <div className={styles.sliderFill} style={{ width: `${(timeToValue / MAX_SLIDER_VALUE) * 100}%` }} />
            <div className={styles.sliderGlow} />
            <input
              className={styles.sliderInput}
              type="range"
              min={MIN_SLIDER_VALUE}
              max={MAX_SLIDER_VALUE}
              step={SLIDER_STEP}
              value={timeToValue}
              onChange={e => setTimeToValue(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles.sliderScale}>
            <span>{config.xAxisLabel1}</span>
            <span>{config.xAxisLabel3}</span>
          </div>
        </div>
      )}

      <div className={styles.buttons}>
        {step > 1 && (
          <button onClick={handleBack} disabled={loading}>
            ← Back
          </button>
        )}
        {step < 4 ? (
          <button onClick={handleNext} disabled={!isValidStep() || loading}>
            Next →
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading}>
            Submit
          </button>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default LaserFocusForm;