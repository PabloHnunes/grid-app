import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  ...restProps
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
        id={id}
        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${!error ? "ring-gray-300 focus:ring-indigo-600 " : "ring-red-700 focus:ring-red-600"}   focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`} 
        {...restProps}
      />
    </div>
  );
};

export default Input;
