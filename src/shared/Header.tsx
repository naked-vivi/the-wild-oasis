import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logout from "@/features/authentication/Logout";
import UserAvatar from "@/features/authentication/UserAvatar";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-end gap-3 w-full border-b border-gray-500 px-6 py-3">
            <UserAvatar />
            <button
                onClick={() => navigate("/account")}
                className="flex items-center justify-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-200 dark:hover:bg-gray-800"
                aria-label="Update account settings"
            >
                <User className="h-5 w-5" />
            </button>

            <Logout />
        </header>
    );
}

export default Header;