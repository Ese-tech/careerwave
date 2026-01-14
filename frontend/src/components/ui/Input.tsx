import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  name,
  id,
  ...props
}: InputProps) {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm transition-colors
          focus:outline-none focus:ring-2 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error 
            ? 'border-error-500 focus:ring-error-500' 
            : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          }
          dark:bg-[#BCD4E6] dark:border-gray-500 dark:text-slate-900 dark:placeholder-slate-600
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
      )}
    </div>
  );
}
