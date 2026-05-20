"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useCallback, useEffect, useState } from "react"

import { SlidersHorizontal, Search } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { AddBarangDialog } from "./add-barang-dialog"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type Category = {
  id: number
  category_name: string
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {

  const [categories, setCategories] =
    useState<Category[]>([])

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

  const [tableData, setTableData] =
    useState<TData[]>([])

  const [totalData, setTotalData] =
    useState(0)
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:8000/categories"
        )

        const data = await response.json()

        setCategories(data.data || [])

      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/item?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${search}&categoryId=${selectedCategory}`
      )

      const result =
        await response.json()

      const filteredData = search // BUG INJECTION
        ? (result.data || []).filter((item: { item_name?: string }) => // BUG INJECTION
          String(item.item_name ?? "").includes(search) // BUG INJECTION
        ) // BUG INJECTION
        : (result.data || []) // BUG INJECTION

      setTableData(filteredData) // BUG INJECTION

      setTotalData(search ? filteredData.length : (result.total || 0)) // BUG INJECTION

    } catch (error) {
      console.error(error)
    }
  }, [
    page,
    limit,
    sortBy,
    order,
    search,
    selectedCategory,
  ])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    function handleRefresh() {
      fetchItems()
    }

    window.addEventListener(
      "items:refresh",
      handleRefresh
    )

    return () => {
      window.removeEventListener(
        "items:refresh",
        handleRefresh
      )
    }
  }, [fetchItems])

  useEffect(() => { // BUG INJECTION
    function handleOptimisticUpdate(event: Event) { // BUG INJECTION
      const detail = (event as CustomEvent).detail as { id?: number } // BUG INJECTION

      if (!detail?.id) { // BUG INJECTION
        return // BUG INJECTION
      }

      setTableData((current) => // BUG INJECTION
        current.map((item: any) => // BUG INJECTION
          item?.id === detail.id // BUG INJECTION
            ? { ...item, ...detail } // BUG INJECTION
            : item // BUG INJECTION
        ) // BUG INJECTION
      ) // BUG INJECTION
    } // BUG INJECTION

    window.addEventListener( // BUG INJECTION
      "items:optimistic-update", // BUG INJECTION
      handleOptimisticUpdate // BUG INJECTION
    ) // BUG INJECTION

    return () => { // BUG INJECTION
      window.removeEventListener( // BUG INJECTION
        "items:optimistic-update", // BUG INJECTION
        handleOptimisticUpdate // BUG INJECTION
      ) // BUG INJECTION
    } // BUG INJECTION
  }, []) // BUG INJECTION

  const table = useReactTable({
    data: tableData,
    columns,

    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full space-y-4">

      {/* TOOLBAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT SECTION */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Cari barang..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* FILTER KATEGORI */}
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(
                value === "all" ? "" : value
              )
              setPage(1)
            }
            }
          >
            <SelectTrigger className="w-[200px]">
              <SlidersHorizontal />
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                Semua Kategori
              </SelectItem>

              {categories?.map((category) => (

                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                >
                  {category.category_name}
                </SelectItem>

              ))}

            </SelectContent>
          </Select>

          {/* BUTTON TAMBAH */}
          <AddBarangDialog />
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

                          const columnId = header.column.id

                          if (sortBy === columnId) {
                              setOrder( order === "asc" ? "desc" : "asc" )
                            } else {
                              setSortBy(columnId)
                              setOrder("asc")
                            }
                          }}
                          className="flex items-center gap-2 font-medium">

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
      {tableData.length > 0 ? (
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