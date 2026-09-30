import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "@/shared/Spinner";

function DashboardLayout() {
  const { bookings, isPending: isPending1 } = useRecentBookings();
  const { stays, confirmedStays, isPending: isPending2 } = useRecentStays();

  if (isPending1 || isPending2) return <Spinner />


  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_34rem_auto]">
      {/* Row 1: 4 Stat/Summary Cards */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,450</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">82</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78%</div>
        </CardContent>
      </Card>

      {/* Row 2: Main Chart / Graph Area (Spans all 4 columns, 34rem high) */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
          {/* Chart component goes here */}
        </CardContent>
      </Card>

      {/* Row 3: Bottom Widgets (e.g., 2 columns each) */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Activity list goes here */}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Stay Duration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Summary table or chart goes here */}
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardLayout;