import { getCurrentUser } from "@/services/apiAuth"
import { useQuery } from "@tanstack/react-query"

function useUser() {
    const { data: user, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    })
    return { user, isPending, isAuthenticated: user?.role === "authenticated" }
}

export default useUser