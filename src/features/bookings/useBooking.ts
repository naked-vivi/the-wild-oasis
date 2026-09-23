import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "@/services/apiBookings";

export default function useBooking() {
  const { bookingId } = useParams();

  const { data: booking, isPending, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => {
      if (!bookingId) throw new Error("Booking not found");
      return getBooking(bookingId);
    },
    retry: false,
  });

  return { booking, isPending, error };
}
