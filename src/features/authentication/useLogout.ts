import { logout as logoutApi } from "@/services/apiAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate("/login", { replace: true })
        }
    })
    return { logout, isPending }
}

export default useLogout