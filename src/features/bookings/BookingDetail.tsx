import BookingDataBox from "./BookingDataBox";
import Spinner from "@/shared/Spinner";
import useBooking from "./useBooking";
import { Button } from "@/components/ui/button";
import { useMoveBack } from "../../hooks/useMoveBack";

// Map booking status to badge colors.
const statusToBadgeStyle: Record<string, string> = {
  unconfirmed: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300",
  "checked-in": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300",
  "checked-out": "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300",
};

function BookingDetail() {
  const { booking, isPending, error } = useBooking();

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  if (error || !booking) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p role="alert">{error?.message || "Booking not found"}</p>
        <Button variant="secondary" onClick={moveBack}>Back</Button>
      </div>
    );
  }

  const { id, status } = booking;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Navigation / Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Booking #{id}
          </h1>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusToBadgeStyle[status] || "bg-muted text-muted-foreground"}`}>
            {status.replace("-", " ")}
          </span>
        </div>

        <Button variant="ghost" onClick={moveBack} className="text-muted-foreground hover:text-foreground">
          &larr; Back
        </Button>
      </div>

      {/* Main Booking Content */}
      <BookingDataBox booking={booking} />

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default BookingDetail;