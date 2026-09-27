import { toast } from "@/components/ui/toast";
import { updateCurrentUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            queryClient.setQueryData(["user"], user);
            toast.add({
                type: "success",
                description: "User account successfully updated"
            });
            return queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error: Error) => {
            toast.add({
                type: "error",
                description: error.message || "Unable to update your account. Please try again.",
            });
        },
    })
    return { updateUser, isUpdating }
}