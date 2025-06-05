import React from 'react';
import style from './MultiStepForm.module.css';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => (
  <div className={style.msfField}>
    <label className={style.msfLabel}>{label}</label>
    <div className={style.msfName}> Add your name here </div>
    <input
      type="text"
      className={style.msfInput}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default TextInput;