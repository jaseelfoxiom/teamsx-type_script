import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTablePagination from "./data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "@/utils/Filter";
import { useReactTable, flexRender } from "@tanstack/react-table";

// Define a custom column interface with the `filterable` property
interface CustomColumnDef<T> {
  filterable?: boolean;
  header: string | ((column: any) => React.ReactNode); // Example header type
  accessorKey?: string;
  cell?: (info: any) => React.ReactNode;
}

interface DataTableProps<T> {
  viewPagination?: boolean;
  table: ReturnType<typeof useReactTable>;
  isLoading: boolean;
  isFetching?: boolean;
  columns: CustomColumnDef<T>[]; // Use CustomColumnDef
}

export const DataTable = <T,>({
  viewPagination = true,
  table,
  isLoading,
  isFetching,
  columns,
}: DataTableProps<T>) => {
  const hasFilters = table.getHeaderGroups().some((headerGroup) =>
    headerGroup.headers.some(
      (header) => (header.column.columnDef as CustomColumnDef<T>).filterable
    )
  );

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="py-2 dark:bg-slate-900 bg-slate-100"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none min-w-52"
                            : ""
                        }
                      >
                        {flexRender(header.column.columnDef.header, {
                          ...header.getContext(),
                          column: header.column,
                        })}
                      </div>
                    )}
                  </TableHead>
                ))
              )}
            </TableRow>

            {/* Row for Filter Boxes, shown only if any column has `filterable: true` */}
            {hasFilters && (
              <TableRow>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {!header.isPlaceholder &&
                        (header.column.columnDef as CustomColumnDef<T>).filterable && (
                          <div className="min-w-52">
                            <Filter column={header.column} />
                          </div>
                        )}
                    </TableHead>
                  ))
                )}
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {viewPagination && <DataTablePagination table={table} />}
    </div>
  );
};
