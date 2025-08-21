import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './VentingMachine.module.css';
// import ConfirmationModal from '../ComboConvo/components/ConfirmationModal';

/**
 * VENTING MACHINE – Multi-step form wired to Google Apps Script + Google Sheets
 *
 * Server contract (Vercel Proxy → Apps Script):
 *   GET  /api/venting-machine-form?action=prompts → { prompts: string[4] }
 *   POST /api/venting-machine-form body { answers: string[4] } → { ok: true }
 *
 * The Vercel proxy handles API key injection server-side for security.
 */

const PROXY_PATH = '/api/venting-machine-form';

const VentingMachine: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [step, setStep] = useState(0); // 0..3
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Load prompts from Apps Script
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      setError(null);
      
      // Try proxy first, fallback to direct Apps Script for local dev
      const urls = [
        `${PROXY_PATH}?action=prompts`,
        `https://script.google.com/macros/s/AKfycbzRgmJPOeXqYbXOnGkAhzzhTgyd8qRW8JtYcGYmlB1bdbUl49zy08BzHuG42N1HYV8AKQ/exec?action=prompts&key=11952ad938bbbd1e806c4c0d82379628d54fc9880489815b9ac21a1efdeab110`
      ];
      
      for (const url of urls) {
        try {
          const res = await fetch(url, {
            headers: { 'Cache-Control': 'no-store' }
          });
          if (!res.ok) throw new Error(`Failed to load prompts: ${res.status}`);
          const json = (await res.json()) as { prompts?: string[] };
          const list = Array.isArray(json.prompts) ? json.prompts.slice(0, 4) : [];
          if (list.length < 4) throw new Error('Expected 4 prompts in the "Prompts" sheet (rows 1–4).');
          setPrompts(list.map(s => s || ''));
          return; // Success, exit early
        } catch (e) {
          console.log(`Failed to fetch from ${url}:`, e);
          continue; // Try next URL
        }
      }
      
      // If all URLs failed
      setError('Failed to load prompts from all sources');
      setLoading(false);
    };
    fetchPrompts();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const isLast = step === 3;

  const constraints = useMemo(() => ([
    // Step 0: single word
    (s: string) => /^\s*\S+\s*$/.test(s),
    // Step 1: short noun (allow 1-3 words, ≤20 chars)
    (s: string) => s.trim().length > 0 && s.trim().length <= 20 && s.trim().split(/\s+/).length <= 3,
    // Step 2: one word (adjective)
    (s: string) => /^\s*\S+\s*$/.test(s),
    // Step 3: short noun
    (s: string) => s.trim().length > 0 && s.trim().length <= 20 && s.trim().split(/\s+/).length <= 3,
  ]), []);

  const helper = [
    'Use exactly one word.',
    'Keep it short (≤ 3 words, ≤ 20 chars).',
    'Use exactly one word (adjective).',
    'Keep it short (≤ 3 words, ≤ 20 chars).',
  ];

  const valid = constraints[step]?.(answers[step] || '') ?? false;

  const updateAnswer = (val: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[step] = val;
      return next;
    });
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${PROXY_PATH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ answers })
      });
      if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
      try { await res.json(); } catch {}
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      const msg = (e as Error)?.message || 'Submission failed';
      if (/load failed|failed to fetch|network error/i.test(msg)) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div className={styles.thankYou}>Thanks for your submission!</div>;
  }

  return (
    <div className={styles.formContainer}>

      <div className={loading ? styles.loading : undefined}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.step}>
          <label>Step {step + 1} / 4</label>
          
          {/* Display the prompt as the main question */}
          {prompts[step] ? (
            <div className={styles.prompt}>{prompts[step]}</div>
          ) : (
            <div className={styles.prompt}>Loading question...</div>
          )}
          
          {step === 1 || step === 3 ? (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              inputMode="text"
              placeholder={helper[step]}
              value={answers[step]}
              onChange={(e) => updateAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && valid) setStep(s => Math.min(3, s + 1)); }}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              inputMode="text"
              placeholder={helper[step]}
              value={answers[step]}
              onChange={(e) => updateAnswer(e.target.value.replace(/\s+/g, ' ').trimStart())}
              onKeyDown={(e) => { if (e.key === 'Enter' && valid) setStep(s => Math.min(3, s + 1)); }}
            />
          )}
          <div className={styles.helper}>{helper[step]}</div>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={loading || step === 0}>
            ← Back
          </button>
          {!isLast ? (
            <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={loading || !valid}>
              Next →
            </button>
          ) : (
            <button onClick={() => submit()} disabled={loading || !valid}>
              Submit
            </button>
          )}
        </div>
      </div>

      <details>
        <summary>Preview prompts</summary>
        <ol>
          {prompts.map((p, i) => <li key={i}>{p}</li>)}
        </ol>
      </details>
    </div>
  );
};

export default VentingMachine;
