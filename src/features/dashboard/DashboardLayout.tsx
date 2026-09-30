import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "@/shared/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_34rem_auto]">
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />

      <SalesChart bookings={bookings} numDays={numDays} />

      {/* Row 2: Main Chart / Graph Area (Spans all 4 columns, 34rem high) */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Stay Duration Summary </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
          {/* Chart component goes here */}
        </CardContent>
      </Card>

      {/* Row 3: Bottom Widgets (e.g., 2 columns each) */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Activity list goes here */}
        </CardContent>
      </Card>


    </div>
  );
}

export default DashboardLayout;