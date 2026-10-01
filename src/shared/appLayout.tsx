import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSideBar'
import Header from './Header'

export default function Layout() {
    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <div className="min-w-0 flex-1">
                <div className="flex items-center">
                    <Header />
                </div>

                <main className="px-4 py-6 sm:px-6 lg:px-9">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}
