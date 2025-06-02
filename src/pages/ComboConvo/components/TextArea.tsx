import React from 'react';
import styles from './MultiStepForm.module.css';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, maxLength }) => (
  <div className={styles.msfField}>
    <label className={styles.msfLabel}>{label}</label>
    <textarea
      className={styles.msfTextarea}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      rows={4}
    />
    <div className={styles.msfCharcount}>
      {value.length} / {maxLength}
    </div>
  </div>
);

export default TextArea;