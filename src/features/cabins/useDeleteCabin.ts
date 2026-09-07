import { toast } from "@/components/ui/toast";
import { deleteCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.add({
                type: "success",
                description: "Cabin successfully deleted",
            });
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => {
            toast.add({
                type: "error",
                description: err.message || "Failed to delete cabin",
            });
        }
    });
    return { isDeleting, mutate };
}

export default useDeleteCabin