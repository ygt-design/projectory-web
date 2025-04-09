// HowWeBuilt.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HowWeBuilt.module.css';

interface Installation {
  name: string;
  color: string;
  image: string;
  description: string;
  link: string;
}

interface HowWeBuiltProps {
  installations: Installation[];
}

function highlightLastWord(name: string): JSX.Element {
    const words = name.trim().split(' ');
    // If there's only one word, just return it
    if (words.length <= 1) {
      return <>{name}</>;
    }
    const lastWord = words.pop(); // e.g. "Web"
    const firstWords = words.join(' '); // e.g. "Futures"
    return (
      <>
        {firstWords} <strong>{lastWord}</strong>
      </>
    );
  }

const HowWeBuilt = ({ installations }: HowWeBuiltProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedInstallation = installations[selectedIndex];

  return (
    <section className={styles.howWeBuiltWrapper}>
      <div className={styles.headingBlock}>
        <h2>How We Built This Program</h2>
        <p> Short intro to how we selected each of the following products detailed below lorem ipsum dolor. </p>
      </div>

      <div className={styles.buttonsRow}>
        {installations.map((inst, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={inst.name}
              className={`${styles.installationButton} ${isActive ? styles.activeButton : ''}`}
              style={{ '--inst-color': inst.color } as React.CSSProperties}
              onClick={() => setSelectedIndex(index)}
            >
              {highlightLastWord(inst.name)}
            </button>
          );
        })}
      </div>

      <div className={styles.installationContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedInstallation.name}
            className={styles.contentInner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={selectedInstallation.image} alt={selectedInstallation.name} className={styles.installationImage} />
            <div className={styles.installationTextWrapper}>
                <h3 style={{ color: selectedInstallation.color }}>{highlightLastWord(selectedInstallation.name)}</h3>
                <p>{selectedInstallation.description}</p>
                <a href={selectedInstallation.link} className={styles.linkButton}>
                See More {selectedInstallation.name} →
                </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowWeBuilt;