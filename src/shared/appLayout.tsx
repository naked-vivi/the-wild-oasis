import { Outlet } from 'react-router-dom'
import Header from './Header'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './AppSideBar'

export default function Layout() {
    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <div className="w-full">
                <div className="flex items-center">
                    <SidebarTrigger />
                    <Header />
                </div>

                <main className=' px-4 py-3 h-screen'>
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}