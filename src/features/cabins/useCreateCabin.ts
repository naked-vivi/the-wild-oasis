// import { toast } from "@/components/ui/toast";
// import { createCabin } from "@/services/apiCabins";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
// import { data } from "react-router-dom";

// function useCreateCabin() {
//     const queryClient = useQueryClient();

//     const { mutate, isPending: isCreating } = useMutation({
//         mutationFn: (data: CabinFormValues) => createCabin(data, editId),
//         onSuccess: () => {
//             toast.add({
//                 type: "success",
//                 description: isEditSession ? "Cabin updated!" : "New cabin created!",
//             });
//             console.log(data)

//             queryClient.invalidateQueries({ queryKey: ['cabins'] });

//             form.reset();
//             onClose?.();
//         },
//     });

//     return { mutate, isCreating };
// }

// export default useCreateCabin

import { toast } from "@/components/ui/toast";
import { createCabin } from "@/services/apiCabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";


type Options = {
    editId?: number;
    onSuccessCallback?: () => void;
};

export function useCreateCabin(options?: Options) {
    const queryClient = useQueryClient();
    const { editId, onSuccessCallback } = options || {};
    const isEditSession = Boolean(editId);

    const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
        mutationFn: (data: any) => createCabin(data, editId),
        onSuccess: () => {
            toast.add({
                type: "success",
                description: isEditSession ? "Cabin successfully updated!" : "New cabin successfully created!",
            });

            queryClient.invalidateQueries({ queryKey: ["cabins"] });

            // Run cleanup callbacks (like form.reset() or onClose())
            onSuccessCallback?.();
        },
        onError: (err: Error) => {
            toast.add({
                type: "error",
                description: err.message || "Failed to save cabin",
            });
        },
    });

    return { createCabinMutate, isCreating, isEditSession };
}

export default useCreateCabin;