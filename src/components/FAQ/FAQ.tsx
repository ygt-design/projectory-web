import React, { useState, useRef, useEffect } from 'react';
import styles from './FAQ.module.css';
import { FiPlus, FiX } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
  extraContent?: JSX.Element;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqWrapper}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <FAQItemComponent
            key={index}
            faq={faq}
            isOpen={isOpen}
            onToggle={() => toggleFAQ(index)}
          />
        );
      })}
    </div>
  );
};

export default FAQ;

/** 
 * Subcomponent that handles measuring and animating the answer's height
 */
interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}
      onClick={onToggle}
    >
      <div className={styles.question}>
        {faq.question}
        <span className={`${styles.icon} ${isOpen ? styles.activeIcon : ''}`}>
          {isOpen ? <FiX /> : <FiPlus />}
        </span>
      </div>

      <div
        className={styles.answerWrapper}
        style={{
          height,
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        <div ref={contentRef} className={styles.answer}>
          <p>{faq.answer}</p>
          {faq.extraContent && (
            <div className={styles.extraContent}>{faq.extraContent}</div>
          )}
        </div>
      </div>
    </div>
  );
};