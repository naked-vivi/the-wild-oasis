import { format, isToday } from "date-fns";
import {
  Building2,
  CheckCircle2,
  DollarSign,
  MessageSquare,
} from "lucide-react";

import { formatDistanceFromNow, formatCurrency } from "../../lib/utils";

// Helper sub-component replacing custom DataItem
function DataItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-2 text-sm text-foreground">
      <span className="flex items-center text-primary [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <span className="font-medium text-muted-foreground">{label}:</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}

interface BookingDataBoxProps {
  booking: any; // Replace with your Booking interface if available
}

export function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    cabins,
  } = booking;
  const { fullName: guestName, email, nationality, countryFlag, nationalID } = guests ?? {};
  const cabinName = cabins?.name ?? "Unknown";

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-primary px-8 py-5 text-primary-foreground">
        <div className="flex items-center gap-4 text-lg font-semibold">
          <Building2 className="h-8 w-8" />
          <p>
            {numNights} nights in Cabin <span className="font-mono text-xl">{cabinName}</span>
          </p>
        </div>

        <p className="text-sm font-medium opacity-90 sm:text-base">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      {/* Main Body */}
      <section className="px-8 pb-3 pt-8">
        {/* Guest Info Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
          {countryFlag && (
            <img
              src={countryFlag}
              alt={`Flag of ${nationality}`}
              className="h-4 w-6 rounded-xs border object-cover"
            />
          )}
          <p className="font-medium text-foreground">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span className="text-muted-foreground/50">&bull;</span>
          <p>{email}</p>
          <span className="text-muted-foreground/50">&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {/* Observations */}
        {observations && (
          <DataItem icon={<MessageSquare />} label="Observations">
            {observations}
          </DataItem>
        )}

        {/* Breakfast Status */}
        <DataItem icon={<CheckCircle2 />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        {/* Price Card */}
        <div
          className={`mt-6 flex items-center justify-between rounded-md px-8 py-4 ${
            isPaid
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
          }`}
        >
          <DataItem icon={<DollarSign />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p className="text-xs font-semibold uppercase tracking-wider">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-4 text-right text-xs text-muted-foreground">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;