import { toast } from "@/components/ui/toast";
import { updateSetting as updateSettingsApi } from "@/services/apiSettings";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    const { mutate: updateSettings, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingsApi,
        onSuccess: () => {
            toast.add({
                type: "success",
                description: "Settings successfully updated!",
            });

            queryClient.invalidateQueries({ queryKey: ["settings"] });

            // Run cleanup callbacks (like form.reset() or onClose())
        },
        onError: (err: Error) => {
            toast.add({
                type: "error",
                description: err.message || "Failed to save settings",
            });
        },
    });

    return { updateSettings, isUpdating };
}

export default useUpdateSettings;