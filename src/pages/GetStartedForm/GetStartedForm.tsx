// src/pages/GetStartedForm/GetStartedForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GetStartedForm.module.css';
import { products } from '../ProductPages/productsData';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useLikedProducts } from '../../context/LikedProductsContext';

type Filters = { type: string[]; objectives: string[]; seating: string[] };

const questionData = {
  type: {
    label: 'Type of product',
    options: ['Facilitated session', 'Interactive installation'],
  },
  objectives: {
    label: 'Objectives',
    options: [
      'Foster connection and networking',
      'Facilitate peer learning and dialogue',
      'Explore strategic priorities and decisions',
      'Connect ideas to action',
      'Build alignment and consensus',
      'Promote reflection and synthesis',
      'Inspire forward thinking and creativity',
      'Visualize collective insights',
    ],
  },
  seating: {
    label: 'Seating Type',
    options: ['Any', 'Round Tables', 'Theatre', 'Not Sure Yet'],
  },
} as const;

const stepKeys = ['type', 'objectives', 'seating'] as const;
type StepKey = typeof stepKeys[number];

// one gradient per step
const BG_GRADIENTS = [
  'linear-gradient(180deg,#F37655 0%,#A92E4C 80%)', // warm coral → peach
  'linear-gradient(180deg,#2FD4B2 0%,#158671 80%)', // teal → sea-green
  'linear-gradient(180deg, #BCCE2D 0%, #838C0A 80%)', // lime → forest
];

const GetStartedForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    type: [],
    objectives: [],
    seating: [],
  });
  const { likedProducts, toggleLike } = useLikedProducts();
  const [recommended, setRecommended] = useState<typeof products[number][]>([]);

  const key = stepKeys[step];

  const toggle = (k: StepKey, opt: string) => {
    setFilters(f => {
      const arr = f[k];
      return {
        ...f,
        [k]: arr.includes(opt) ? arr.filter(x => x !== opt) : [...arr, opt],
      };
    });
  };

  const next = () => {
    if (step < 2) setStep(s => s + 1);
    else submit();
  };
  const back = () => step > 0 && setStep(s => s - 1);

  const submit = () => {
    const scored = products
      .map(p => {
        let sc = 0;
        sc += p.filters.type.filter(t => filters.type.includes(t)).length;
        sc += p.filters.objectives.filter(o =>
          filters.objectives.includes(o)
        ).length;
        sc += filters.seating.includes('Any')
          ? 1
          : p.filters.seating.filter(s => filters.seating.includes(s)).length;
        return { p, sc };
      })
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 5)
      .map(x => x.p);

    scored.forEach(p => !likedProducts.includes(p.id) && toggleLike(p.id));
    setRecommended(scored);
  };

  return (
    <motion.div
      className={styles.container}
      animate={{ background: BG_GRADIENTS[step] }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {recommended.length === 0 ? (
          <motion.div
            key={step}
            className={styles.formWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className={styles.title}>
              {questionData[key].label}
            </h1>
            <p className={styles.subTitle}>
              Step {step + 1} of {stepKeys.length}
            </p>

            <div className={styles.options}>
              {questionData[key].options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={
                    filters[key].includes(opt)
                      ? styles.chipSelected
                      : styles.chip
                  }
                  onClick={() => toggle(key, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className={styles.nav}>
              {step > 0 && (
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={back}
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                className={styles.nextBtn}
                onClick={next}
                disabled={filters[key].length === 0}
              >
                {step < 2 ? 'Next →' : 'Finish →'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.section
            key="results"
            className={styles.recommendedSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.recommendedTitle}>
              Thanks! Here are a few ideas to get the conversation started:
            </h2>
            <div className={styles.recommendedGrid}>
                {recommended.map(prod => (
                    <div key={prod.id} className={styles.recommendedCard}>
                    <ProductCard product={prod} />
                    </div>
                ))}
                </div>
            <div className={styles.estimateWrapper}>
              <button
                className={styles.estimateBtn}
                onClick={() => window.location.href = '/get-estimate'}
              >
                Get An Estimate →
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GetStartedForm;