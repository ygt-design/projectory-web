import React, { useState, useEffect, useRef, useMemo } from 'react';
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

// Submit a new response
async function submitResponse(payload: Omit<ResponseRow, 'Timestamp'>) {
  const res = await fetch(`${PROXY_PATH}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.success) throw new Error('Submission failed');
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

  // Store fetched responses (for future graphing)
  const [allResponses, setAllResponses] = useState<ResponseRow[]>([]);

  // Reference for scrolling
  const formRef = useRef<HTMLDivElement>(null);

  // Scroll into view on step change
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  // Load existing submissions on mount
  useEffect(() => {
    fetchResponses()
      .then(setAllResponses)
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
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Compute teal-to-dark background gradient for a slider value [0–10]
  const sliderBackground = useMemo(() => (value: number) => {
    const pct = (value / 10) * 100;
    return `linear-gradient(to right, #2FD4B2 ${pct}%, #191919 ${pct}%)`;
  }, []);

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
            value={table}
            onChange={e => setTable(Number(e.target.value))}
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
          <label>Rate the Impact (0–10): {impact}</label>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={impact}
            onChange={e => setImpact(parseFloat(e.target.value))}
            style={{
              background: sliderBackground(impact),
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
          />
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <label>Rate the Effort (0–10): {effort}</label>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={effort}
            onChange={e => setEffort(parseFloat(e.target.value))}
            style={{
              background: sliderBackground(effort),
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
          />
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