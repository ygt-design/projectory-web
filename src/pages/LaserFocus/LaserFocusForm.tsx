import React, { useState, useEffect, useRef } from 'react';
import ConfirmationModal from '../ComboConvo/components/ConfirmationModal';
import styles from './LaserFocusForm.module.css';

// Proxy path for Vite dev server
const PROXY_PATH = '/api/laser-focus-form';
// Your API key still goes as a query param
const API_KEY = import.meta.env.VITE_GOOGLE_APPSCRIPT_API_KEY as string;

interface ResponseRow {
  Timestamp: string;
  table: number;
  idea: string;
  impact: number;
  effort: number;
}

// Fetch all submitted rows
async function fetchResponses(): Promise<ResponseRow[]> {
  const res = await fetch(`${PROXY_PATH}?key=${API_KEY}`);
  if (!res.ok) throw new Error(`Error fetching data: ${res.status}`);
  return res.json();
}

// Submit a new response (tolerant of varied success payloads)
async function submitResponse(payload: Omit<ResponseRow, 'Timestamp'>) {
  const res = await fetch(`${PROXY_PATH}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(payload),
  });
  // If HTTP status not OK, fail
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
  // Some backends return empty body; tolerate
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
  const [effort, setEffort] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Store fetched responses (reserved for future use)
  const [allResponses, setAllResponses] = useState<ResponseRow[]>([]);
  void allResponses; // keep variable for future without triggering unused warnings

  // Reference for scrolling
  const formRef = useRef<HTMLDivElement>(null);
  const impactBoxRef = useRef<HTMLDivElement>(null);
  const effortBoxRef = useRef<HTMLDivElement>(null);
  const isDraggingImpactRef = useRef(false);
  const isDraggingEffortRef = useRef(false);
  // (no rAF batching currently)

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const valueFromPointer = (clientX: number, box: HTMLDivElement | null) => {
    if (!box) return null;
    const rect = box.getBoundingClientRect();
    const raw = (clientX - rect.left) / rect.width;
    const t = clamp(raw, 0, 1);
    const val = t * 10; // 0..10
    // Snap to 0.1 but avoid micro jitter
    const rounded = Math.round(val * 10) / 10;
    return rounded;
  };

  // (previous smooth setters removed for immediate updates)

  // Scroll into view on step change
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

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
        return wordCount > 0 && wordCount <= 25;
      }
      case 3:
        return impact >= 0 && impact <= 10;
      case 4:
        return effort >= 0 && effort <= 10;
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
      await submitResponse({ table: Number(table), idea, impact, effort });
      setSubmitted(true);
      setShowModal(false);
      // Ensure viewport shows the thank-you
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    } catch (e) {
      const msg = (e as Error)?.message || '';
      // Some mobile browsers report network errors like 'Load failed' even when the
      // server processed the POST. In that case, optimistically show thank-you.
      if (/load failed|failed to fetch|network error/i.test(msg)) {
        setSubmitted(true);
        setShowModal(false);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
      } else {
        setError(msg || 'Submission failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Former inline slider background replaced by custom slider UI

  if (submitted) {
    return <div className={styles.thankYou}>Thanks for your submission!</div>;
  }

  return (
    <div ref={formRef} className={styles.formContainer}>
      {step === 1 && (
        <div className={styles.step}>
          <label>Table Number:</label>
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
          <label>Submit Your Idea (max 25 words):</label>
          <textarea
            maxLength={200}
            value={idea}
            onChange={e => setIdea(e.target.value)}
          />
          <div>
            {idea.trim().split(/\s+/).filter(w => w).length}/25 words
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <label>Rate the Impact </label>
          <div
            ref={impactBoxRef}
            className={`${styles.sliderBox} ${styles.sliderBoxFull}`}
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
            <div className={styles.sliderFill} style={{ width: `${(impact / 10) * 100}%` }} />
            <div className={styles.sliderGlow} />
            <input
              className={styles.sliderInput}
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={impact}
              onChange={e => setImpact(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles.sliderScale}>
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <label>Rate the Effort </label>
          <div
            ref={effortBoxRef}
            className={`${styles.sliderBox} ${styles.sliderBoxFull}`}
            onTouchStart={(e) => {
              e.preventDefault();
              isDraggingEffortRef.current = true;
              const t = e.touches[0];
              const val = valueFromPointer(t?.clientX ?? 0, effortBoxRef.current);
              if (val != null) setEffort(val);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              if (!isDraggingEffortRef.current) return;
              const t = e.touches[0];
              const val = valueFromPointer(t?.clientX ?? 0, effortBoxRef.current);
              if (val != null) setEffort(val);
            }}
            onTouchEnd={() => { isDraggingEffortRef.current = false; }}
          >
            <div className={styles.sliderFill} style={{ width: `${(effort / 10) * 100}%` }} />
            <div className={styles.sliderGlow} />
            <input
              className={styles.sliderInput}
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={effort}
              onChange={e => setEffort(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles.sliderScale}>
            <span>0</span>
            <span>5</span>
            <span>10</span>
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
          <button onClick={() => setShowModal(true)} disabled={loading}>
            Submit
          </button>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to submit?"
          onConfirm={() => {
            // submit but keep modal open until data is sent
            handleSubmit();
          }}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default LaserFocusForm;