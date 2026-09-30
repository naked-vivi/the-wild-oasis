import { getBookingsAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const requestedDays = Number(searchParams.get("last") ?? 7);
    const numDays = [7, 30, 90].includes(requestedDays) ? requestedDays : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isPending, error, data: bookings = [] } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}`]
    })
    return { isPending, error, bookings ,numDays}
}