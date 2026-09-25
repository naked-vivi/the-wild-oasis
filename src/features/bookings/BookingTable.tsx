import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BOOKINGS_PAGE_SIZE } from "@/services/apiBookings";
import Spinner from "@/shared/Spinner";
import useBookings from "./useBookings";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, CheckCircle } from "lucide-react";
import { PaginationPage } from "@/shared/pagination-page";
import { Link } from "react-router-dom";

export default function BookingTable() {
  const { bookings, isPending, error, count, page } = useBookings();

  if (isPending) {
    return <Spinner />;
  }

  if (error) return <p role="alert">{error.message}</p>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-30">Cabin</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-12.5"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No bookings found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => {
              // Status badge styling helper
              const statusStyles: Record<string, string> = {
                unconfirmed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                "checked-in": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                "checked-out": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
              };

              return (
                <TableRow key={booking.id} className="hover:bg-muted/50 transition-colors">
                  {/* Cabin Name */}
                  <TableCell className="font-semibold text-foreground">
                    {booking.cabins?.name || booking.cabinName}
                  </TableCell>

                  {/* Guest Info */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{booking.guests?.fullName || booking.guestName}</span>
                      <span className="text-xs text-muted-foreground">
                        {booking.guests?.email || booking.guestEmail}
                      </span>
                    </div>
                  </TableCell>

                  {/* Stay Dates */}
                  <TableCell className="text-sm">
                    <div className="font-medium">
                      {booking.startDate} &mdash; {booking.endDate}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {booking.numNights} night stay
                    </span>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[booking.status] || "bg-secondary text-secondary-foreground"
                        }`}
                    >
                      {booking.status?.replace("-", " ")}
                    </span>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-right font-medium text-foreground">
                    ${booking.totalPrice}
                  </TableCell>

                  {/* Action Menu */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Link to={`/bookings/${booking.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View details
                          </Link>
                        </DropdownMenuItem>

                        {booking.status === "unconfirmed" && (
                          <DropdownMenuItem className="cursor-pointer" render={<Link to={`/checkin/${booking.id}`} />}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Check-in
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter className="bg-muted/50">
          <TableRow>
            <TableCell colSpan={6}>
              <PaginationPage count={count} page={page} pageSize={BOOKINGS_PAGE_SIZE} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div >
  );
}
