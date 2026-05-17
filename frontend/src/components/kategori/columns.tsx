"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { EditKategoriDialog } from "./edit-kategori-dialog"
import { DeleteKategoriDialog } from "./delete-kategori.dialog"

export type KategoriColumns = {
  id: number
  category_name: string
  description?: string
  itemCount: number
  createdAt: string
}

export const columns: ColumnDef<KategoriColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
    minSize: 50,
    maxSize: 100,
    meta: {
      sortable: true,
    },
  },
  {
    accessorKey: "category_name",
    header: "Nama Kategori",
    minSize: 200,
    maxSize: 300,
    meta: {
      sortable: true,
    },
  },
  {
    accessorKey: "itemCount",
    header: "Jumlah Barang",
    minSize: 150,
    maxSize: 150,
    meta: {
      sortable: true,
    },
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat Pada",
    minSize: 150,
    maxSize: 150,
    meta: {
      sortable: true,
    },
  },
  {
    id: "aksi",
    header: "Aksi",

    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex gap-2">
          <EditKategoriDialog
            category={data}
          />

          <DeleteKategoriDialog
            id={data.id}
            category_name={data.category_name}
          />
        </div>
      )
    },
  }
]