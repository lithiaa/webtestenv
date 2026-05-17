"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EditBarangDialog } from "./edit-barang-dialog"
import { DeleteBarangDialog } from "./delete-barang-dialog"
import { DetailBarangDialog } from "./detail-barang-dialog"

export type DashboardColumns = {
  id: number
  item_name: string
  category_name: string
  stock_amount: number
  unit: string
  selling_price: number
  aksi: string
}

export const columns: ColumnDef<DashboardColumns>[] = [
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
    accessorKey: "item_name",
    header: "Nama Barang",
    minSize: 200,
    maxSize: 300,
    meta: {
      sortable: true,
    },
  },
  {
    accessorKey: "category_name",
    header: "Kategori",
    minSize: 150,
    maxSize: 150,
  },
  {
    accessorKey: "stock_amount",
    header: "Stok",
    minSize: 100,
    maxSize: 100,
    meta: {
      sortable: true,
    },
  },
  {
    accessorKey: "unit",
    header: "Satuan",
    minSize: 100,
    maxSize: 100,
    meta: {
      sortable: true,
    },
  },
  {
    accessorKey: "selling_price",
    header: "Harga Jual",
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
          <DetailBarangDialog
            item={data}
          />

          <EditBarangDialog
            item={data}
          />

          <DeleteBarangDialog
            id={data.id}
            item_name={data.item_name}
          />
        </div>
      )
    },
  }
]