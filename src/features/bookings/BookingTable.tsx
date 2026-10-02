import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Eye, CheckCircle, LogOut, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BOOKINGS_PAGE_SIZE } from "@/services/apiBookings";
import { formatBookingDate, formatCurrency } from "@/lib/utils";
import Spinner from "@/shared/Spinner";
import { PaginationPage } from "@/shared/pagination-page";
import ConfirmDelete from "@/shared/confirmDelete";
import useBookings from "./useBookings";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const statusStyles: Record<string, string> = {
  unconfirmed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "checked-in": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "checked-out": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

function BookingStatus({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[status] || "bg-secondary text-secondary-foreground"}`}>{status?.replaceAll("-", " ") || "Unknown"}</span>;
}

type BookingActionsProps = {
  id: number;
  status: string;
  busy: boolean;
  onCheckout: (id: number) => void;
  onDelete: (id: number) => void;
};

function BookingActions({ id, status, busy, onCheckout, onDelete }: BookingActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" className="size-11 p-0" aria-label={`Actions for booking #${id}`}><MoreHorizontal aria-hidden="true" /></Button>} />
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link to={`/bookings/${id}`} />}><Eye aria-hidden="true" />View details</DropdownMenuItem>
        {status === "unconfirmed" && <DropdownMenuItem render={<Link to={`/checkin/${id}`} />}><CheckCircle aria-hidden="true" />Check-in</DropdownMenuItem>}
        {status === "checked-in" && <DropdownMenuItem disabled={busy} onClick={() => onCheckout(id)}><LogOut aria-hidden="true" />Check-out</DropdownMenuItem>}
        <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={busy} onClick={() => onDelete(id)}><Trash aria-hidden="true" />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function BookingTable() {
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(null);
  const { bookings, isPending, error, count, page } = useBookings();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const actions = { busy: isCheckingOut || isDeletingBooking, onCheckout: (id: number) => checkOut(id), onDelete: setDeletingBookingId };

  if (isPending) return <Spinner />;
  if (error) return <p role="alert">{error.message}</p>;
  if (bookings.length === 0) return <p role="status" className="rounded-md border p-8 text-center text-muted-foreground">No bookings found. Try another status filter.</p>;

  return (
    <>
      <div className="min-w-0 rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50"><TableRow>
            <TableHead>Cabin</TableHead><TableHead>Guest</TableHead><TableHead>Dates</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow></TableHeader>
          <TableBody>{bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-semibold">{booking.cabins?.name || booking.cabinName}</TableCell>
              <TableCell><div className="flex flex-col"><span className="font-medium">{booking.guests?.fullName || booking.guestName}</span><span className="text-xs text-muted-foreground">{booking.guests?.email || booking.guestEmail}</span></div></TableCell>
              <TableCell><div className="font-medium">{formatBookingDate(booking.startDate)} &mdash; {formatBookingDate(booking.endDate)}</div><span className="text-xs text-muted-foreground">{booking.numNights} {booking.numNights === 1 ? "night" : "nights"}</span></TableCell>
              <TableCell><BookingStatus status={booking.status} /></TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(booking.totalPrice)}</TableCell>
              <TableCell className="text-right"><BookingActions id={booking.id} status={booking.status} {...actions} /></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </div>
      {count > BOOKINGS_PAGE_SIZE && <div className="mt-3 rounded-md border bg-muted/50 p-2"><PaginationPage count={count} page={page} pageSize={BOOKINGS_PAGE_SIZE} /></div>}
      {deletingBookingId !== null && <ConfirmDelete resourceName="Booking" itemName={`#${deletingBookingId}`} isOpen isDeleting={isDeletingBooking} onClose={() => setDeletingBookingId(null)} onConfirm={() => deleteBooking(deletingBookingId, { onSuccess: () => setDeletingBookingId(null) })} />}
    </>
  );
}
