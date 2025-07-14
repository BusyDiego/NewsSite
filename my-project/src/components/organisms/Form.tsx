import React from 'react';
import { Button, Text } from '../atoms';
import { FormField } from '../molecules';
import './Form.css';

interface Field {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}

interface FormProps {
  title?: string;
  fields: Field[];
  onFieldChange: (fieldId: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const Form: React.FC<FormProps> = ({
  title,
  fields,
  onFieldChange,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  isSubmitting = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {title && (
        <Text variant="h3" className="form-title">
          {title}
        </Text>
      )}
      
      <div className="form-fields">
        {fields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={(e) => onFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={field.error}
            errorMessage={field.errorMessage}
          />
        ))}
      </div>
      
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
        )}
      </div>
    </form>
  );
};