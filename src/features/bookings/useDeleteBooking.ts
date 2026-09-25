import { toast } from "@/components/ui/toast";
import { deleteBooking as deleteBookingApi } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate: deleteBooking, isPending: isDeletingBooking, error: deleteErr } = useMutation({
        mutationFn: (bookingId: number) => deleteBookingApi(bookingId),
        onSuccess: () => {
            toast.add({
                type: "success",
                description: "Booking successfully deleted",
            });
            return queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (err) => {
            toast.add({
                type: "error",
                description: err.message || "Failed to delete booking",
            });
        }
    });
    return { deleteBooking, isDeletingBooking, deleteErr };
}
