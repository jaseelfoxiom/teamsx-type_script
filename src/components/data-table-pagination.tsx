import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Table as TanStackTable } from "@tanstack/react-table";

interface DataTablePaginationProps<T> {
  table: TanStackTable<T>;
}

function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  const totalCount = table.getRowCount();
  const [allSelected, setAllSelected] = useState(false);

  const handleAllClick = () => {
    table.setPageSize(totalCount);
    setAllSelected(true);
  };

  return (
    <div className="flex items-center justify-between mt-2">
      {/* Page Size Selector */}
      <div className="flex items-center space-x-2">
        <Select
          value={!allSelected ? `${table.getState().pagination.pageSize}` : "all"}
          onValueChange={(value) => {
            if (value === "all") {
              handleAllClick();
            } else {
              table.setPageSize(Number(value));
              setAllSelected(false);
            }
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue
              placeholder={`${table.getState().pagination.pageSize}`}
            />
          </SelectTrigger>
          <SelectContent side="top">
            {[15, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
          {table.getFilteredSelectedRowModel().rows?.length || 0} of{" "}
          {table.getFilteredRowModel().rows?.length || 0} row(s) selected.
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() ? table.getPageCount().toLocaleString() : 0}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4 text-gray-800" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4 text-gray-800" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
