import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/general/sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

import { DashboardTable } from "@/components/dashboard/dashboard-table"
import { UserProfile } from "@/components/general/user-profile"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />

        <SidebarInset>
          <header className="flex justify-between items-center gap-2 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <UserProfile
              name="Muhammad Bagus Indrawan"
              email="indraw910@gmail.com"
            />
          </header>

          <div className="flex w-full flex-col p-4">
            <DashboardTable />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}