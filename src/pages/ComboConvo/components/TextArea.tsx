import React from 'react';
import styles from './MultiStepForm.module.css';

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, maxLength, onFocus, onBlur }) => (
  <div className={styles.msfField}>
    {label && <label className={styles.msfLabel}>{label}</label>}
    <textarea
      className={styles.msfTextarea}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      rows={4}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    <div className={styles.msfCharcount}>
      {value.length} / {maxLength}
    </div>
  </div>
);

export default TextArea;