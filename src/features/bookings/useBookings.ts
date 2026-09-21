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

    const pageValue = Number(searchParams.get("page") || 1);
    const page = Number.isSafeInteger(pageValue) && pageValue > 0 ? pageValue : 1;

    // 3. Query
    const {
        isPending,
        error,
        data,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    return { isPending, error, bookings: data?.bookings ?? [], count: data?.count ?? 0, page };
}