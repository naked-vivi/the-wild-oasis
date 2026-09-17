import { getBookings } from "@/services/apiBookings";
import type { FilterOption, SortOption } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
    const [searchParams] = useSearchParams();

    // 1. Filter
    const filterValue = searchParams.get("status");
    const filter: FilterOption | null =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    // 2. Sort
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy: SortOption = { field, direction };

    // 3. Query
    const {
        isPending,
        error,
        data: bookings = [],
    } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });

    return { isPending, error, bookings };
}