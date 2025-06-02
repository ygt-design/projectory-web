import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import ConfirmationModal from './ConfirmationModal';
import styles from './MultiStepForm.module.css';

const WEB_APP_URL = '/api/comboconvo';

interface FormState {
  orangeCard: string;
  blueCard: string;
  whatIsA: string;
  thatCould: string;
  freeText: string;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>({
    orangeCard: '',
    blueCard: '',
    whatIsA: '',
    thatCould: '',
    freeText: '',
  });
  const [optionsA, setOptionsA] = useState<string[]>([]);
  const [optionsB, setOptionsB] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Fetch dropdown options once on component mount
  useEffect(() => {
    fetch(WEB_APP_URL)
      .then(r => r.json())
      .then(({ whatIsA, thatCould }) => {
        setOptionsA(whatIsA);
        setOptionsB(thatCould);
      })
      .catch(err => console.error('Lookup fetch failed:', err));
  }, []);

  // Scroll into view when step changes
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const isValidStep = () => {
    switch (step) {
      case 1:
        return form.orangeCard.trim().length > 0;
      case 2:
        return form.blueCard.trim().length > 0;
      case 3:
        return form.whatIsA !== '';
      case 4:
        return form.thatCould !== '';
      case 5:
        return form.freeText.trim().length > 0 && form.freeText.length <= 75;
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

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setError('');
    fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setSubmitted(true);
        } else {
          setError('Submission failed. Please try again.');
        }
      })
      .catch(err => {
        console.error('Submit failed:', err);
        setError('Submission failed. Please try again.');
      })
      .finally(() => {
        setLoading(false);
        setShowModal(false);
      });
  };

  if (submitted) {
    return (
      <div className={styles.finalResponse}>
        Thank you! Your responses have been recorded.
      </div>
    );
  }

  return (
    <motion.div
      className={styles['multi-step-form']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={formRef}
    >
      {/* Progress bar with step markers */}
      <div className={styles['progress-container']}>
        <div
          className={styles['progress-fill']}
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        />
        {[1, 2, 3, 4, 5].map(n => (
          <div
            key={n}
            className={`
              ${styles['progress-step-marker']}
              ${step >= n ? styles.active : ''}
            `}
          />
        ))}
      </div>

      {/* Step content with fade/slide animation */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TextInput
              label="Who has the orange card?"
              value={form.orangeCard}
              onChange={val => handleChange('orangeCard', val)}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TextInput
              label="Who has the blue card?"
              value={form.blueCard}
              onChange={val => handleChange('blueCard', val)}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <SelectInput
              label="What is a (an)"
              options={optionsA}
              value={form.whatIsA}
              onChange={val => handleChange('whatIsA', val)}
            />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <SelectInput
              label="That could…?"
              options={optionsB}
              value={form.thatCould}
              onChange={val => handleChange('thatCould', val)}
            />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TextArea
              label="Your response"
              value={form.freeText}
              onChange={val => handleChange('freeText', val)}
              maxLength={75}
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
        {step < 5 ? (
          <button type="button" onClick={handleNext} disabled={!isValidStep() || loading}>
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={!isValidStep() || loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you are done? Once submitted, you cannot go back."
          onConfirm={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}

      {error && <div className={styles['form-error']}>{error}</div>}
    </motion.div>
  );
};

export default MultiStepForm;