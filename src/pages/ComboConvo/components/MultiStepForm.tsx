import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import ConfirmationModal from './ConfirmationModal';
import styles from './MultiStepForm.module.css';

// Replace this with your deployed Apps Script URL
const WEB_APP_URL = '/api/combo-convo-form'; // e.g. '/api/combo-convo-form'

interface FormState {
  orangeCard: string;
  blueCard: string;
  whatIsA: string;
  thatCould: string;
  freeText: string;
  email: string;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>({
    orangeCard: '',
    blueCard: '',
    whatIsA: '',
    thatCould: '',
    freeText: '',
    email: '',
  });
  const [optionsA, setOptionsA] = useState<string[]>([]);
  const [optionsB, setOptionsB] = useState<string[]>([]);
  const [optionsLoading, setOptionsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  // 1) Fetch “whatIsA” / “thatCould” lookup data on mount
  useEffect(() => {
    setOptionsLoading(true);
    fetch(WEB_APP_URL)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Lookup returned ${r.status}`);
        }
        return r.json();
      })
      .then(({ whatIsA, thatCould }) => {
        setOptionsA(whatIsA);
        setOptionsB(thatCould);
        setOptionsLoading(false);
      })
      .catch((err) => {
        console.error('Lookup fetch failed:', err);
        setError('Unable to load dropdown options. Please try again later.');
        setOptionsLoading(false);
      });
  }, []);

  // 2) Scroll into view when step changes
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const isValidStep = () => {
    switch (step) {
      case 1:
        return form.orangeCard.trim().length > 0 && form.whatIsA !== '';
      case 2:
        return form.blueCard.trim().length > 0 && form.thatCould !== '';
      case 3:
        return form.freeText.trim().length > 0 && form.freeText.length <= 75;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isValidStep()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 3) Called when the user clicks “Yes, Submit” in the modal
  const handleConfirm = () => {
    // Combine all six fields into one payload:
    const payload = {
      orangeCard: form.orangeCard,
      blueCard:   form.blueCard,
      whatIsA:    form.whatIsA,
      thatCould:  form.thatCould,
      freeText:   form.freeText,
      email:      form.email.trim(),
    };

    console.log('→ about to POST full payload:', JSON.stringify(payload));
    setLoading(true);
    setError('');

    fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (r) => {
        const text = await r.text().catch(() => '');
        if (!r.ok) {
          console.error('Server returned non-200:', r.status, text);
          throw new Error(`HTTP ${r.status}`);
        }
        return JSON.parse(text);
      })
      .then((res) => {
        if (res.success) {
          setSubmitted(true);
        } else {
          alert('Server responded with error: ' + (res.error || 'Unknown'));
        }
      })
      .catch((err) => {
        alert('Fetch error: ' + err.message);
      })
      .finally(() => setLoading(false));
  };

  // 4) After a successful submission, show a “thank you” screen
  if (submitted) {
    return (
      <div className={styles.finalResponse}>
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1.2rem',
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="24" fill="#2FD4B2" />
            <path
              d="M34 18L21.5 30.5L14 23"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p>Thanks for sending your awesome response!</p>

        <div className={styles.msfLinkedInWrapper}>
          <p>See more ways to yawn-proof live events. Get updates on LinkedIn</p>
          <a
            href="https://www.linkedin.com/company/theprojectory/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.msfFollowLink}
          >
            Follow us
          </a>
        </div>
        
      </div>
    );
  }

  // 5) If lookup data is still loading, show a spinner
  if (optionsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className={styles['msf-spinner-orange']} />
      </div>
    );
  }

  // 6) Otherwise show steps 1→2→3 and a final “Submit” button that opens the modal
  return (
    <motion.div
      className={styles['multi-step-form']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={formRef}
    >
      {/* (Progress bar is omitted for brevity) */}

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        {step === 1 && (
          <motion.div
            key="step1"
            className={styles.msfField}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.colorRect}></div>
            <TextInput
              placeholder="Add your name here..."
              label={
                <>
                  Who has the{' '}
                  <span className={styles.msfStrong} style={{ color: '#F37655' }}>
                    orange
                  </span>{' '}
                  card?
                </>
              }
              value={form.orangeCard}
              onChange={(val) => handleChange('orangeCard', val)}
              onFocus={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onBlur={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={styles.msfInput}
              labelClassName={styles.msfLabel}
            />
            <SelectInput
              label={<span style={{ color: '#F37655' }}>What is a (an) …</span>}
              options={optionsA}
              value={form.whatIsA}
              onChange={(val) => handleChange('whatIsA', val)}
              onFocus={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onBlur={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={styles.msfSelect}
              labelClassName={styles.msfLabel}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className={styles.msfField}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`${styles.colorRect} ${styles.blueRect}`}></div>
            <TextInput
              placeholder="Add your name here..."
              label={
                <>
                  Who has the{' '}
                  <span className={styles.msfStrong} style={{ color: '#2FD4B2' }}>
                    teal
                  </span>{' '}
                  card?
                </>
              }
              value={form.blueCard}
              onChange={(val) => handleChange('blueCard', val)}
              onFocus={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onBlur={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={styles.msfInput}
              labelClassName={styles.msfLabel}
            />
            <SelectInput
              label={<span style={{ color: '#2FD4B2' }}>That could…?</span>}
              options={optionsB}
              value={form.thatCould}
              onChange={(val) => handleChange('thatCould', val)}
              onFocus={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onBlur={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={styles.msfSelect}
              labelClassName={styles.msfLabel}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            className={styles.msfField}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <label className={styles.msfLabel}>Enter your clever response here</label>
            <TextArea
              value={form.freeText}
              onChange={(val) => handleChange('freeText', val)}
              maxLength={75}
              onFocus={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onBlur={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={styles.msfTextarea}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className={styles['form-buttons']}>
        {step > 1 && (
          <button type="button" onClick={handleBack} disabled={loading}>
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!isValidStep() || loading}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            Submit
          </button>
        )}
      </div>

      {/* Confirmation Modal (unchanged) */}
      {showModal && (
        <ConfirmationModal
          message="Click submit to send your awesome response"
          email={form.email}
          onEmailChange={(newEmail) => handleChange('email', newEmail)}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}

      {error && <div className={styles['form-error']}>{error}</div>}
    </motion.div>
  );
};

export default MultiStepForm;