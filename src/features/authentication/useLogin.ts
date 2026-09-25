import { login as loginApi } from "@/services/apiAuth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/toast"

function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isPending, error } = useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            navigate('/dashboard', { replace: true })
        },
        onError: (err: Error) => {
            toast.add({ type: "error", description: err.message });
        }
    })
    return { login, isPending, error }
}

export default useLogin
