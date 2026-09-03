import MainNav from "@/shared/MainNav"
import Logo from "./Logo"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Collapsible } from "@/components/ui/collapsible"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>

            <SidebarContent>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <MainNav />
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}