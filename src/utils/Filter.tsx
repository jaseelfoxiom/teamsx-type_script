import React from "react";
import DebouncedInput from "./DebounceInput"; // Ensure this import is correct
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Column } from "@tanstack/react-table"; // Use Column instead of ColumnInstance

// Define the type for filter options (ensure they are strings)
interface FilterOption {
  value: string;
  label: string;
}

interface ColumnMeta<T> {
  filterVariant?: "range" | "select"; // Example of possible variants
  filterOptions?: FilterOption[]; // Filter options, now strictly typed
}

interface FilterProps<T> {
  column: Column<T>;
}

export function Filter<T>({ column }: FilterProps<T>) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, filterOptions } = column.columnDef.meta as ColumnMeta<T> ?? {}; // Cast to ColumnMeta

  // Handle the case where the value is undefined or null in filterOptions
  const currentFilterValue = columnFilterValue ?? "";

  return (
    <div>
      {filterVariant === "range" ? (
        <div className="flex space-x-2">
          <DebouncedInput
            value={columnFilterValue?.[0] ?? ""}
            onChange={(value) =>
              column.setFilterValue((old) => [value, old?.[1]])
            }
            placeholder="Min"
            // Optional: className can be added if required
          />
          <DebouncedInput
            value={columnFilterValue?.[1] ?? ""}
            onChange={(value) =>
              column.setFilterValue((old) => [old?.[0], value])
            }
            placeholder="Max"
            // Optional: className can be added if required
          />
        </div>
      ) : filterVariant === "select" ? (
        <Select
          onValueChange={(value: string) => column.setFilterValue(value)} // Ensure value is a string
          value={currentFilterValue as string} // Cast columnFilterValue to string if needed
        >
          <SelectTrigger className="w-36 h-8 mt-2">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        // Default input for searching
        <DebouncedInput
          onChange={(value) => column.setFilterValue(value)}
          placeholder="Search..."
          value={currentFilterValue as string} // Cast columnFilterValue to string
        />
      )}
      <div className="h-1" />
    </div>
  );
}

export default Filter;
