import React from 'react';
import styles from './MultiStepForm.module.css';

interface SelectInputProps {
  label: string;
  options?: string[];
  value: string;
  onChange: (v: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options = [], value, onChange }) => (
  <div className={styles.msfField}>
    <label className={styles.msfLabel}>{label}</label>
    <select
      className={styles.msfSelect}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Choose the prompt on your card...</option>
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;