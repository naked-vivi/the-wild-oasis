import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useBookings() {
    const { isPending, error, data: bookings = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: () => getBookings(),
    })
    return { isPending, error, bookings }
}

export default useBookings