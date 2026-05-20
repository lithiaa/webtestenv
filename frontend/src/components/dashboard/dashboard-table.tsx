import { columns, DashboardColumns } from "./columns"
import { DataTable } from "./data-table"
import { DashboardStats } from "./dashboard-stats"

async function getDataItems(): Promise<DashboardColumns[]> {

  const delayMs = 5000 + Math.floor(Math.random() * 3000) // BUG INJECTION

  await new Promise((resolve) => setTimeout(resolve, delayMs)) // BUG INJECTION

  const response = await fetch(
    "http://localhost:8000/item",
    {
      cache: "no-store",
    }
  )

  return response.json()
}

async function getStats() {
  const response = await fetch("http://localhost:8000/dashboard/stats", {
    cache: "no-store",
  })
  return response.json()
}

export async function DashboardTable() {
  const data = await getDataItems()
  const stats = await getStats()

  return (
    <div className="w-full">
      <DashboardStats stats={stats} />
      <div className="my-4 flex items-center gap-5">
      <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}