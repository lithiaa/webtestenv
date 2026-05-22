"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table"

import { useCallback, useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"

import { Search } from "lucide-react"

import { AddKategoriDialog } from "./add-kategori-dialog"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { apiBaseUrl } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [page, setPage] =
    useState(1)

  const [limit] =
    useState(5)

  const [sortBy, setSortBy] =
    useState("createdAt")

  const [order, setOrder] =
    useState<"asc" | "desc">("desc")

  const [search, setSearch] =
    useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("")

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])

  const [tableData, setTableData] =
    useState<TData[]>([])

  const [totalData, setTotalData] =
    useState(0)

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/categories?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${search}`
      )

      const result =
        await response.json()

      setTableData(result.data || [])

      setTotalData(result.total)

    } catch (error) {
      console.error(error)
    }
  }, [
    page,
    limit,
    sortBy,
    order,
    search,
  ])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    function handleRefresh() {
      fetchItems()
    }

    window.addEventListener(
      "categories:refresh",
      handleRefresh
    )

    return () => {
      window.removeEventListener(
        "categories:refresh",
        handleRefresh
      )
    }
  }, [fetchItems])

  const table = useReactTable({
    data: tableData,
    columns,

    state: {
      columnFilters,
    },

    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full space-y-4">

      {/* TOOLBAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT SECTION */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari kategori..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">

          {/* BUTTON TAMBAH BARANG */}
          <AddKategoriDialog />
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = header.column.columnDef.meta?.sortable
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {sortable ? (
                        <button
                          onClick={() => {
                            const columnId =
                              header.column.id

                          if (sortBy === columnId) {
                            setOrder(
                              order === "asc"
                                ? "desc"
                                : "asc"
                            )
                          } else {
                            setSortBy(columnId)
                            setOrder("asc")
                          }
                        }}
                        className="flex items-center gap-2 font-medium"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                        {sortBy === header.column.id ? (
                          order === "asc" ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )
                        ) : (
                          <ArrowUpDown className="h-4 w-4" />
                        )}

                      </button>
                    ) : (
                      <div className="font-medium">
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </div>
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
      {table.getFilteredRowModel().rows.length > 0 ? (
        <div className="flex items-center justify-end px-4 py-4">

          {/* INFO */}
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {(page - 1) * limit + 1}
            {" - "}
            {Math.min(
              page * limit,
              totalData
            )}{" "}
            of {totalData} data
          </div>

          {/* PAGINATION */}
          <Pagination>
            <PaginationContent>

              {/* PREVIOUS */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    if (page > 1) {
                      setPage(page - 1)
                    }
                  }}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* PAGE NUMBER */}
              {Array.from(
                { length: Math.ceil(totalData / limit) },
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={page === index + 1}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        setPage(index + 1)
                      }}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* NEXT */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    if (
                      page <
                      Math.ceil(totalData / limit)
                    ) {
                      setPage(page + 1)
                    }
                  }}
                  className={
                    page >= Math.ceil(totalData / limit)
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>

        </div>
      ) : null}
    </div>
  )
}