import { columns, KategoriColumns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<KategoriColumns[]> {
  const response = await fetch(
    "http://localhost:8000/categories",
    {
      cache: "no-store",
    }
  )

  return response.json()
}

export async function KategoriTable() {
  const data = await getData()
  return <DataTable columns={columns} data={data} />
}