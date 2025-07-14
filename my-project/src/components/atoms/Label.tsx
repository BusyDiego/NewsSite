import React from 'react';
import './Label.css';

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
}) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
      {required && <span className="label-required">*</span>}
    </label>
  );
};