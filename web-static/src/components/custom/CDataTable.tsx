/* eslint-disable react-hooks/exhaustive-deps */

/** Documents
https://ui.shadcn.com/docs/components/radix/data-table
npm i @tanstack/react-table
npx shadcn@latest add table dropdown-menu

*/

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table as RTable,
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

/* #region Types / Constants */
export const getDefaultPagination = (pageSize?: number) => {
  return { pageIndex: 0, pageSize: pageSize || 10 };
};
export type PaginationType = ReturnType<typeof getDefaultPagination>;
export const PageSizeList = [5, 10, 20, 50];
/* #endregion */

/* #region Interface */
interface CDataTableProps<TData> {
  data: TData[];
  columnDatas?: ColumnDef<TData>[];
  columnOptions?: ColumnOptions<TData>;
  emptyComp?: React.ReactNode;
  filterOptions?: FilterOptions;
  addOptions?: AddOptions;
  menuOptions?: MenuOptions;
  actionOptions?: ActionOptions<TData>;
  paginationOptions?: PaginationOptions;
  children?: React.ReactNode;
}

interface ColumnOptions<TData> {
  columnKeys: string[];
  editColums?: (columns: ColumnDef<TData>[]) => void;
  editCell?: (args: {
    item: TData;
    columnKey: string;
    value: MyAny;
  }) => React.ReactNode;
}

interface FilterOptions {
  columnKey: string;
  placeholder?: string;
  className?: string;
}

interface MenuOptions {
  buttonTitle: string;
}

interface AddOptions {
  buttonTitle?: string;
  buttonFn: () => void;
}

interface ActionOptions<TData> {
  menuContent: (data: TData) => React.ReactNode;
}

interface PaginationOptions {
  initialPageSize: number;
  manuelPagination?: boolean;
  pageCount?: number;
  loading?: boolean;
  isPageSizeControl?: boolean;
  pageSizeList?: number[];
  paginationFn?: (props: PaginationType) => void;
}

/* #endregion */

export const CDataTable = <TData,>(props: CDataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState(
    getDefaultPagination(props.paginationOptions?.initialPageSize),
  );

  const columns = columnsConfig(props);

  // const table = useReactTable({
  //   data: props.data,
  //   columns: columns,
  //   defaultColumn: getDefaultColumn(props),
  //   getCoreRowModel: getCoreRowModel(),
  //   onSortingChange: setSorting,
  //   getSortedRowModel: getSortedRowModel(),
  //   onColumnFiltersChange: setColumnFilters,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   getPaginationRowModel: getPaginationRowModel(),
  //   onPaginationChange: setPagination,
  //   initialState: {
  //     pagination: props.paginationOptions && pagination,
  //   },
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     pagination,
  //   },
  //   pageCount: props.paginationOptions?.pageCount,
  //   manualPagination: true,
  // });
  const table = useReactTable({
    data: props.data,
    columns: columns,
    defaultColumn: getDefaultColumn(props),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    initialState: {
      pagination: props.paginationOptions && pagination,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    pageCount: props.paginationOptions?.pageCount,
    manualPagination:
      props.paginationOptions?.manuelPagination === false ? false : true,
  });

  useEffect(() => {
    props.paginationOptions?.paginationFn?.(pagination);
  }, [pagination]);

  return (
    <div>
      <div className="flex pb-2 gap-2">
        {props.filterOptions && (
          <Input
            placeholder={props.filterOptions?.placeholder || "Ara.."}
            value={
              (table
                .getColumn(props.filterOptions.columnKey)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(props.filterOptions!.columnKey)
                ?.setFilterValue(event.target.value)
            }
            className={`text-sm ${props.filterOptions.className}`}
          />
        )}
        {props.addOptions && (
          <Button
            variant="outline"
            className="ml-auto cursor-pointer"
            onClick={() => props.addOptions?.buttonFn()}
          >
            {props.addOptions.buttonTitle || "Ekle"}
            <Plus />
          </Button>
        )}
        {props.menuOptions && (
          <ColumnMenu menuOptions={props.menuOptions} table={table} />
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  let className = "";
                  if (header.id === "actions") className = "w-9";
                  return (
                    <TableHead key={header.id} className={className}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {
            <TableBody>
              {props.paginationOptions?.loading && props.data.length === 0 ? (
                <NonData columnsLength={(columns || []).length}>
                  {"Veri alınıyor.."}
                </NonData>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      let customCellContent = undefined;
                      if (
                        cell.column.id !== "actions" &&
                        !props.columnDatas &&
                        props.columnOptions?.editCell
                      ) {
                        customCellContent = props.columnOptions?.editCell({
                          item: cell.row.original,
                          columnKey: cell.column.id,
                          value: cell.getValue(),
                        });
                      }
                      let className = "";
                      if (cell.column.id === "actions") {
                        className = "w-0 p-0 pr-px text-right";
                      }

                      return (
                        <TableCell key={cell.id} className={className}>
                          {flexRender(
                            customCellContent || cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <NonData columnsLength={(columns || []).length}>
                  {props.emptyComp || "Veri Yok."}
                </NonData>
              )}
            </TableBody>
          }
        </Table>
      </div>
      <div className="flex gap-2 justify-end items-end">
        {props.children && <div className="w-full">{props.children}</div>}
        {props.paginationOptions && (
          <PaginationControl
            table={table}
            loading={props.paginationOptions.loading}
            isPageSizeControl={props.paginationOptions.isPageSizeControl}
            pageSizeList={props.paginationOptions.pageSizeList}
          />
        )}
      </div>
    </div>
  );
};

/* #region Components */
const ColumnMenu = <TData,>(props: {
  menuOptions: MenuOptions;
  table: RTable<TData>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto cursor-pointer">
          {props.menuOptions.buttonTitle}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {props.table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ActionMenu = <TData,>(props: {
  options: ActionOptions<TData>;
  row: Row<TData>;
}) => {
  const data = props.row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8">
          <span className="sr-only">Open action menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {props.options.menuContent(data)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const PaginationControl = <TData,>(props: {
  table: RTable<TData>;
  loading?: boolean;
  isPageSizeControl?: boolean;
  pageSizeList?: number[];
  className?: string;
}) => {
  const spinner = useMemo(
    () => (
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent border-(--color-primary)`}
        style={{ width: 20, height: 20 }}
      />
    ),
    [],
  );

  return (
    <div className="flex items-center justify-end space-x-2 pt-2">
      {props.loading && spinner}
      {props.isPageSizeControl && (
        <PageSizeControl
          table={props.table}
          pageSizeList={props.pageSizeList}
        />
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.table.setPageIndex(0)}
        disabled={props.loading || !props.table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.table.previousPage()}
        disabled={props.loading || !props.table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.table.nextPage()}
        disabled={props.loading || !props.table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
        disabled={props.loading || !props.table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};

const PageSizeControl = <TData,>(props: {
  table: RTable<TData>;
  pageSizeList?: number[];
  className?: string;
}) => {
  const sizeList = props.pageSizeList || PageSizeList;
  const cSize = props.table.getState().pagination.pageSize;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto cursor-pointer min-w-18 h-8"
        >
          <p className="w-full text-start">{cSize}</p>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-18">
        {sizeList.map((size) => {
          return (
            <DropdownMenuCheckboxItem
              key={size}
              checked={size === cSize}
              onCheckedChange={(value) => {
                if (value) props.table.setPageSize(size);
              }}
              className="pl-2 pr-8 [&>span]:left-auto [&>span]:right-2"
            >
              {size}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NonData = (props: {
  columnsLength: number;
  children: React.ReactNode;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={props.columnsLength} className="text-center">
        {props.children}
      </TableCell>
    </TableRow>
  );
};
/* #endregion */

/* #region Helpers */
function columnsConfig<TData>(props: CDataTableProps<TData>) {
  let columns: ColumnDef<TData>[] = [];
  if (props.columnDatas) {
    columns = props.columnDatas;
  } else if (props.columnOptions) {
    columns = createColumns<TData>(props.columnOptions.columnKeys);
    props.columnOptions.editColums?.(columns);
  }

  if (props.actionOptions) {
    columns.push({
      id: "actions",
      enableHiding: false,
      enableResizing: false,
      header: () => <div className="w-0" />,
      cell: ({ row }) => (
        <ActionMenu options={props.actionOptions!} row={row} />
      ),
    });
  }

  return columns;
}

function createColumns<TData>(keyList: string[]) {
  const result: ColumnDef<TData>[] = [];
  for (const key of keyList) {
    if (key)
      result.push({
        accessorKey: key,
        header: ({ column }) => (
          <CTableHeader column={column}>{key}</CTableHeader>
        ),
        cell: ({ row }) => <CTableRow row={row} columnKey={key} />,
      });
  }
  return result;
}

function getDefaultColumn<TData>(props: CDataTableProps<TData>) {
  const defaultColumn: Partial<ColumnDef<TData>> = {};
  if (props.filterOptions) {
    defaultColumn.filterFn = (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId);
      if (rowValue === null || rowValue === undefined) return false;

      const target = String(filterValue).toLowerCase();

      let searchSource = "";
      if (rowValue instanceof Date) {
        searchSource = `${rowValue.toLocaleString("tr-TR")}}`;
      } else if (typeof rowValue === "object") {
        searchSource = JSON.stringify(rowValue);
      } else {
        searchSource = String(rowValue);
      }

      return searchSource.toLowerCase().includes(target);
    };
  }

  return defaultColumn;
}
/* #endregion */

/* #region Tools */
export const CTableHeader = <T,>(props: {
  column?: Column<T>;
  isSorted?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`font-bold capitalize ${props.className}`}>
      {!props.isSorted && props.children}
      {props.isSorted && (
        <div
          className="flex gap-1 items-center cursor-pointer w-fit"
          onClick={() =>
            props.column?.toggleSorting(props.column?.getIsSorted() === "asc")
          }
        >
          {props.children}
          <ArrowUpDown size={24} className="p-1 rounded-sm" />
        </div>
      )}
    </div>
  );
};

export const CTableRow = <T,>(props: {
  row: Row<T>;
  columnKey: string;
  className?: string;
  children?: (value: MyAny) => React.ReactNode;
}) => {
  const value = props.row.getValue(props.columnKey) as React.ReactNode;

  return (
    <div className={props.className}>{props.children?.(value) || value}</div>
  );
};
/* #endregion */
