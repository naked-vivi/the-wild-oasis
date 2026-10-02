import TodayActivity from "@/features/check-in-out/TodayActivity";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "@/shared/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import useCabins from "../cabins/useCabins";

function DashboardLayout() {
  const { bookings, isPending: isPending1, error: bookingsError, numDays } = useRecentBookings();
  const { confirmedStays, isPending: isPending2, error: staysError } = useRecentStays();
  const { cabins = [], isPending: isPending3, error: cabinsError } = useCabins();

  if (isPending1 || isPending2 || isPending3) return <Spinner />

  if (bookingsError || staysError || cabinsError) {
    return (
      <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-destructive">
        {bookingsError?.message || staysError?.message || cabinsError?.message}
      </p>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 @min-[36rem]:grid-cols-2 @min-[64rem]:grid-cols-4 sm:gap-6">
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />

      <TodayActivity />

      <DurationChart confirmedStays={confirmedStays} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
