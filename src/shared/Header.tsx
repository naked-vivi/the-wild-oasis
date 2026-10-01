import Logout from "@/features/authentication/Logout";
import UserAvatar from "@/features/authentication/UserAvatar";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between gap-3 w-full border-b border-gray-500 px-4 py-3">
            <SidebarTrigger />
            <div className="flex items-center gap-3">
                <UserAvatar />
                <button
                    onClick={() => navigate("/account")}
                    className="flex items-center justify-center p-2 text-muted-foreground rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Update account settings"
                >
                    <User className="h-5 w-5" />
                </button>

                <ModeToggle />
                <Logout />
            </div>
        </header>
    );
}

export default Header;