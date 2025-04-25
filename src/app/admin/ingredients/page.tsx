"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data: info[] = [
    {
        id: "1",
        name: "Sugar",
        unit: 316,
        currentStock: 100,
        minimumStock: 100,
        supplierInfo: "Abc",
        costPerUnit: 100,
        createdAt: new Date("2025-04-24T17:33:28.074Z"),
        updatedAt: new Date("2025-04-24T17:33:28.074Z")
    },
    {
        id: "1",
        name: "Sugar",
        unit: 316,
        currentStock: 101,
        minimumStock: 101,
        supplierInfo: "Abc",
        costPerUnit: 100,
        createdAt: new Date("2025-04-24T17:33:28.074Z"),
        updatedAt: new Date("2025-04-24T17:33:28.074Z")
    },
    {
        id: "1",
        name: "Sugar",
        unit: 316,
        currentStock: 102,
        minimumStock: 102,
        supplierInfo: "Abc",
        costPerUnit: 100,
        createdAt: new Date("2025-04-24T17:33:28.074Z"),
        updatedAt: new Date("2025-04-24T17:33:28.074Z")
    },
]

export type info = {
    id: string
    name: string
    unit: number
    currentStock: number
    minimumStock: number
    supplierInfo: string
    costPerUnit: number
    createdAt: Date
    updatedAt: Date
}

export const columns: ColumnDef<info>[] = [
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
        cell: ({ row }) => (
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
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "currentStock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Current Stock
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("currentStock")}</div>,
    },
    {
        accessorKey: "minimumStock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Minimum Stock
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("minimumStock")}</div>,
    },
    {
        accessorKey: "supplierInfo",
        header: "Supplier Info",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("supplierInfo")}</div>
        ),
    },
    {
        accessorKey: "costPerUnit",
        header: "Cost Per Unit ",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("costPerUnit")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date: Date = row.getValue("createdAt");
            const formattedDate = new Date(date).toLocaleString(); // hoặc format bằng date-fns
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            const date: Date = row.getValue("updatedAt");
            const formattedDate = new Date(date).toLocaleString(); // hoặc format bằng date-fns
            return <div>{formattedDate}</div>;
        },
    }
]

function IngredientsPage() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    return (
        <div className="container mx-auto w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter ingredient..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filter <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    {/* Top */}
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Bottom */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default IngredientsPage