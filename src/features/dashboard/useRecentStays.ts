import { getStaysAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const requestedDays = Number(searchParams.get("last") ?? 7);
    const numDays = [7, 30, 90].includes(requestedDays) ? requestedDays : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isPending, error, data: stays = [] } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`]
    })

    const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out")

    return { isPending, error, stays, confirmedStays }
}