import BookingDataBox from "../../features/bookings/BookingDataBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "@/shared/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useCheckin } from "./useCheckin";

function CheckinBooking() {

  const [confirmPaid, setConfirmPaid] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isPending, error } = useBooking();
  const { checkIn, isCheckingIn } = useCheckin();

  useEffect(() => {
    if (booking && booking.status !== "unconfirmed") {
      moveBack();
    }
  }, [booking, moveBack]);

  if (isPending) return <Spinner />;

  if (error || !booking) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p role="alert">{error?.message || "Booking not found"}</p>
        <Button variant="secondary" onClick={moveBack}>Back</Button>
      </div>
    );
  }

  const { id: bookingId, guests, totalPrice } = booking;
  function handleCheckIn() {
    if (!confirmPaid || isCheckingIn || booking.status !== "unconfirmed") return;
    checkIn(bookingId);
  }



  return (
    <div className="flex flex-col gap-6">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Check in booking #{bookingId}
        </h1>
        <Button
          variant="ghost"
          onClick={moveBack}
          className="text-muted-foreground hover:text-foreground"
        >
          &larr; Back
        </Button>
      </div>

      {/* Booking Details Card */}
      <BookingDataBox booking={booking} />

      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-xs">
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onCheckedChange={setConfirmPaid}
          disabled={isCheckingIn}
        />
        <label htmlFor="confirm" className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I confirm that {guests.fullName} has paid the total amount of {" "} {formatCurrency(totalPrice)}
        </label>
      </div>


      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default CheckinBooking;
