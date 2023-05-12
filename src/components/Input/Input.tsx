import React from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = false
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={id}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${!error ? "ring-gray-300 focus:ring-indigo-600 " : "ring-red-700 focus:ring-red-600"}   focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`} 
      />
    </div>
  );
};

export default Input;
