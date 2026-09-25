import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLogout from "./useLogout";

function Logout() {
    const { logout, isPending } = useLogout();

    return (
        <Button variant="ghost" className="gap-2 cursor-pointer" disabled={isPending} onClick={() => logout()}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
        </Button>
    );
}

export default Logout;
