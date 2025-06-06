import React from 'react';
import style from './MultiStepForm.module.css';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  labelClassName,
  onFocus,
  onBlur,
}) => (
  <div className={style.msfField}>
    <label className={labelClassName || style.msfLabel}>{label}</label>
    <input
      type="text"
      className={className || style.msfInput}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || ''}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </div>
);

export default TextInput;