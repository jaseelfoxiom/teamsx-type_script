// DebouncedInput.tsx
import React from "react";

interface DebouncedInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  debounce: number;
  className?: string; // Add className as an optional prop
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({ placeholder, value, onChange, debounce, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}  // Apply className here
    />
  );
};

export default DebouncedInput;
