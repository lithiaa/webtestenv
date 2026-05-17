import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DashboardStatsData = {
  totalBarang: number
  totalKategori: number
  stokMenipis: number
  stokHabis: number
}

interface DashboardStatsProps {
  stats: DashboardStatsData
}

export function DashboardStats({
  stats,
}: DashboardStatsProps) {

  const statsData = [
    {
      title: "Total Barang",
      value: stats.totalBarang,
    },
    {
      title: "Total Kategori",
      value: stats.totalKategori,
    },
    {
      title: "Stok Menipis",
      value: stats.stokMenipis,
    },
    {
      title: "Stok Habis",
      value: stats.stokHabis,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {statsData.map((stat) => (
        <Card key={stat.title}>

          <CardHeader className="pb-2">

            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">
              {stat.value}
            </div>

          </CardContent>

        </Card>
      ))}

    </div>
  )
}