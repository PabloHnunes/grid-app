import React, { SelectHTMLAttributes, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  data: Array<Option>;
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
}

const Select: React.FC<Props> = ({ id, label, data, selectedValue, onSelectedValueChange, ...props }) => {
  const [currentValue, setCurrentValue] = useState(selectedValue); // definindo o estado como uma string vazia
  
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setCurrentValue(value);
    onSelectedValueChange(value);
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        value={currentValue} onChange={handleSelectChange} 
        {...props}
      >
        {" "}
        <option value="">Selecione uma opção</option>
        {data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
