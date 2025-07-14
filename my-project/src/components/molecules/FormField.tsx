import React from 'react';
import { Label, Input } from '../atoms';
import './FormField.css';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id: string;
  name?: string;
  error?: boolean;
  errorMessage?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  id,
  name,
  error = false,
  errorMessage,
}) => {
  return (
    <div className="form-field">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        id={id}
        name={name || id}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};