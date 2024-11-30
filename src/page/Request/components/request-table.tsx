import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import StudentTableHeader from "./student-table-header";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "./EmptyState";
import { TrashIcon } from "lucide-react";
import { PATHS } from "@/constants/paths";
import { useNavigate } from "react-router-dom";
import { PurchasedCourses } from "./purchased-courses";

const RequestTable = ({
  data,
  isLoading,
  isFetching,
  totalDocs,
  onUpdate,
  onDelete,
  onExport,
  setPagination,
  filters,
  onFilterChange,
  pagination,
  onSearch,
  searchTerm,
}) => {
  const [isOpen, setisOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);
  const navigate = useNavigate();
  const onPopperClick = (id) => {
    console.log(id)
    setisOpen(true);
    setselectedUser(id);
  };

  const StudentColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) =>
        isFetching || isLoading ? (
          <Skeleton className="w-4 h-4" />
        ) : (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) =>
        isFetching || isLoading ? (
          <Skeleton className="w-24 h-4" />
        ) : (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      filterable: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) =>
        isFetching || isLoading ? (
          <Skeleton className="w-40 h-4" />
        ) : (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      filterable: false,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      filterable: true,
      cell: ({ row }) => {
        const handleSwitchChange = (checked) => {
          const id = row.original?._id;
          if (!id) return;
          const body = { isActive: checked };
          onUpdate({ id, body });
        };

        return isFetching || isLoading ? (
          <Skeleton className="w-8 h-4" />
        ) : row.original ? (
          <Switch
            id={`switch-${row.original._id}`}
            checked={!!row.original.isActive}
            onCheckedChange={() => handleSwitchChange(!row.original.isActive)}
          />
        ) : null;
      },
      meta: {
        filterVariant: "select",
        filterOptions: [
          { value: null, label: "All" },
          { value: true, label: "Active" },
          { value: false, label: "Not Active" },
        ],
      },
    },
    {
      id: "enrollStudent", // Add an id for the column
      // header: "Action", // Optionally give it a header name
      cell: ({ row }) => (
        <Button
          className="h-9 gap-1"
          size="sm"
          onClick={() =>
            navigate(PATHS.BASE_PATH + PATHS.Enrollment, {
              state: {
                skipEmailVerification: true,
                email: row.original.email,
                userId: row.original._id,
              },
            })
          }>
          Enroll Course
        </Button>
      ),
      filterable: false,
    },
    {
      id: "purchasedCourses",

      cell: ({ row }) =>
        isFetching || isLoading ? (
          <Skeleton className="w-40 h-4" />
        ) : (
          <PurchasedCourses id={row.original._id} />
        ),
      filterable: false,
    },
    {
      id: "actions",
      header: () => <div className="text-center">Action</div>,
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original._id;

        return isFetching ? (
          <Skeleton className="w-16 h-8 mx-auto" />
        ) : (
          <div className="flex justify-center">
            <TrashIcon
              onClick={() => onDelete(id)}
              className="h-4 w-4 text-red-500 cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const hasActiveFilters = filters?.length > 0;
  const shouldShowLoader = isLoading && !hasActiveFilters;

  const table = useReactTable({
    data,
    columns: StudentColumns,
    onColumnFiltersChange: onFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: Math.ceil(totalDocs / pagination.pageSize),
    rowCount: totalDocs || 0,

    debugTable: true,
    manualFiltering: true,
    state: {
      pagination,
      // sorting,
      filters,
    },
  });

  const selectedRows = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original);

  return (
    <div>
      {!searchTerm && data?.length === 0 && !isLoading && !hasActiveFilters ? (
        <EmptyState />
      ) : (
        <>
          <StudentTableHeader
            onFilterChange={onFilterChange}
            selectedRows={selectedRows}
            table={table}
            onSearch={onSearch}
            className="max-w-sm"  
          />

          <DataTable
            table={table}
            columns={StudentColumns}
            isLoading={isLoading}
          />
        </>
      )}

    </div>
  );
};

export default RequestTable;
