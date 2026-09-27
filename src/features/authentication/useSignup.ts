import { toast } from "@/components/ui/toast";
import { signup as signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            toast.add({
                type: "success",
                description: data?.session
                    ? "User successfully created."
                    : "Signup request accepted. The user may need to confirm their email before signing in.",
            });
        },
        onError: (error: Error) => {
            toast.add({
                type: "error",
                description: error.message || "Unable to create user. Please try again.",
            });
        },
    });

    return { signup, isPending };
}