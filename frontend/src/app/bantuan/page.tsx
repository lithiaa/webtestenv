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

import { BantuanContent } from "@/components/bantuan/bantuan-content"
import { UserProfile } from "@/components/general/user-profile"

export default function BantuanPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="min-w-0 w-full">
          <header className="flex w-full items-center gap-2 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      Bantuan
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto">
              <UserProfile
                name="Muhammad Bagus Indrawan"
                email="indraw910@gmail.com"
              />
            </div>
          </header>
          <div className="p-4">
            <BantuanContent />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}