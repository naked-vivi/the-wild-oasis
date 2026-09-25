import { toast } from "@/components/ui/toast";
import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheckout() {

    const queryClient = useQueryClient();

    const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
        mutationFn: (bookingId: number) =>
            updateBooking(bookingId, { status: "checked-out" }),

        onSuccess: (updatedBooking) => {

            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.add({ type: "success", description: `Booking ${updatedBooking.id} successfully checked out` });
        },
        onError: (err: Error) => {
            toast.add({ type: "error", description: err.message });
        },
    });
    return { checkOut, isCheckingOut };
}
