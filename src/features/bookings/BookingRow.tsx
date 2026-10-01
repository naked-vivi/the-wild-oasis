import { format, isToday } from "date-fns";

import { TableRow, TableCell } from "@/components/ui/table";

import { formatCurrency, formatDistanceFromNow } from "../../lib/utils";

function BookingRow({
  booking: {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusStyles: Record<string, string> = {
    unconfirmed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    "checked-in": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    "checked-out": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <TableRow>
      <TableCell className="font-semibold text-foreground">{cabinName}</TableCell>

      <TableCell>
        <div className="flex flex-col gap-0.5 [&>span:first-child]:font-medium [&>span:last-child]:text-xs [&>span:last-child]:text-muted-foreground">
          <span>{guestName}</span>
          <span>{email}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-0.5 [&>span:first-child]:font-medium [&>span:last-child]:text-xs [&>span:last-child]:text-muted-foreground">
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[status] || "bg-secondary text-secondary-foreground"}`}>
          {status.replace("-", " ")}
        </span>
      </TableCell>

      <TableCell className="text-right font-medium">{formatCurrency(totalPrice)}</TableCell>
    </TableRow>
  );
}

export default BookingRow;
