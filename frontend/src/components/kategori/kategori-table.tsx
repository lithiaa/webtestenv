import { columns, KategoriColumns } from "./columns"
import { DataTable } from "./data-table"
import { apiBaseUrl } from "@/lib/utils"

async function getData(): Promise<KategoriColumns[]> {
  const response = await fetch(
    `${apiBaseUrl}/categories`,
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