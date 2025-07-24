"use client";

import React from 'react';

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  valid: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, value, onChange, placeholder, valid }) => {
  return (
    <div className="relative z-0 w-full group">
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className="peer block w-full rounded-md border border-gray-300 bg-white px-4 pt-5 pb-2 text-gray-900 focus:border-[#FF7001] focus:outline-none focus:ring-1 focus:ring-[#FF7001] transition"
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-2 z-10 bg-white px-1 text-gray-500 text-sm transition-all duration-200 pointer-events-none
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#FF7001]"
      >
        {placeholder}
      </label>
      {valid && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffd230] font-bold select-none pointer-events-none">
          ✓
        </span>
      )}
    </div>
  );
};

export default InputField;
