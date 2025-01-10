import React from 'react';
import { TextInputProps } from '../../models/interfaces';

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className="text-input"
    />
  );
};

export default TextInput; 