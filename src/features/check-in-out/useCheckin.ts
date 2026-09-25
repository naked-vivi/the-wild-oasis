import { toast } from "@/components/ui/toast";
import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
        mutationFn: (id: number) => updateBooking(id, { status: "checked-in", isPaid: true }),
        onSuccess: (updatedBooking) => {
            navigate(`/bookings/${updatedBooking.id}`, { replace: true });
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.add({ type: "success", description: `Booking ${updatedBooking.id} successfully checked in` });
        },
        onError: (err: Error) => {
            toast.add({ type: "error", description: err.message });
        },
    });
    return { checkIn, isCheckingIn };
}
