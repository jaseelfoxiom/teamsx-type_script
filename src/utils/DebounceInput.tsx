import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  debounce?: number;
  width?: "sm" | "md" | "lg"; // Adjust this according to your design system
}

function DebouncedInput({
  value: initialValue,
  onChange,
  placeholder,
  debounce = 500,
  width = "sm",
}: DebouncedInputProps) {
  const [value, setValue] = React.useState<string>(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      className={`max-w-${width} border shadow rounded h-8`}
      onChange={handleChange}
      placeholder={placeholder}
      type="text"
      value={value ?? ""}
    />
  );
}

export default DebouncedInput;
