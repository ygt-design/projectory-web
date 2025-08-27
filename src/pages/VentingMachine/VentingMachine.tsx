import React, { useEffect, useRef, useState } from 'react';
import styles from './VentingMachine.module.css';
import ConfirmationModal from '../ComboConvo/components/ConfirmationModal';

/**
 * VENTING MACHINE – Multi-step form wired to Google Apps Script + Google Sheets
 */

const PROXY_PATH = '/api/venting-machine-form';

const VentingMachine: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [step, setStep] = useState(0); // 0..3
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load prompts from Apps Script
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Try proxy first with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const res = await fetch(`${PROXY_PATH}?action=prompts`, {
          headers: { 
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error(`Failed to load prompts: ${res.status}`);
        const json = (await res.json()) as { prompts?: string[] };
        const list = Array.isArray(json.prompts) ? json.prompts.slice(0, 4) : [];
        
        if (list.length < 4) throw new Error('Expected 4 prompts in the "Prompts" sheet (rows 1–4).');
        
        setPrompts(list.map(s => s || ''));
        setLoading(false);
        
      } catch (e) {
        console.log('Proxy failed:', e);
        setError('Failed to load prompts. Please refresh the page.');
        setLoading(false);
      }
    };
    
    fetchPrompts();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  // Validation per step - single word only
  const isValidStep = () => {
    const currentAnswer = answers[step] || '';
    const trimmed = currentAnswer.trim();
    // Check if it's a single word (no spaces, at least 1 character)
    return trimmed.length > 0 && !trimmed.includes(' ');
  };

  const handleNext = () => {
    if (isValidStep() && step < 3) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Add timeout for submission too
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for submission
      
      const res = await fetch(`${PROXY_PATH}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ answers }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
      try { await res.json(); } catch { /* ignore JSON parse errors */ }
      
      setSubmitted(true);
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (e) {
      const msg = (e as Error)?.message || 'Submission failed';
      // Be more optimistic about submission success for network errors
      if (/load failed|failed to fetch|network error|aborted/i.test(msg)) {
        setSubmitted(true);
        setShowModal(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(msg);
        setShowModal(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = (val: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[step] = val;
      return next;
    });
  };

  if (submitted) {
    return <div className={styles.thankYou}>Thanks for your submission!</div>;
  }

  return (
    <div className={styles.formContainer}>
      {/* Current step display */}
      <div className={styles.step}>
        {/* Display the prompt as the main question */}
        {prompts[step] ? (
          <div className={styles.prompt}>{prompts[step]}</div>
        ) : (
          <div className={styles.prompt}>Loading question...</div>
        )}
        
        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          placeholder="Type a single word..."
          value={answers[step] || ''}
          onChange={(e) => {
            // Remove any spaces to enforce single word
            const value = e.target.value.replace(/\s/g, '');
            updateAnswer(value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isValidStep()) {
              if (step < 3) {
                handleNext();
              } else {
                setShowModal(true);
              }
            }
          }}
        />
        
        {/* Validation indicator */}
        {answers[step] && (
          <div className={styles.validationStatus}>
            <span className={isValidStep() ? styles.valid : styles.invalid}>
              {isValidStep() ? '✓ Valid single word' : '✗ Please enter one word only (no spaces)'}
            </span>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className={styles.buttons}>
        {step > 0 && (
          <button onClick={handleBack} disabled={loading}>
            ← Back
          </button>
        )}
        
        {step < 3 ? (
          <button onClick={handleNext} disabled={!isValidStep() || loading}>
            Next →
          </button>
        ) : (
          <button onClick={() => setShowModal(true)} disabled={!isValidStep() || loading}>
            Submit
          </button>
        )}
      </div>

      {/* Error display */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Loading indicator */}
      {loading && <div className={styles.loading}>Processing...</div>}

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to submit your answers?"
          onConfirm={handleSubmit}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default VentingMachine;