import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CheckoutButton from "./CheckoutButton";

type TodayItemProps = {
  activity: {
    id: number;
    status: string;
    numNights: number;
    guests: {
      fullName: string;
      nationality: string | null;
      countryFlag: string | null;
    } | null;
  };
};

function TodayItem({ activity }: TodayItemProps) {
  const { id, guests, status, numNights } = activity;
  const isArrival = status === "unconfirmed";
  const isDeparture = status === "checked-in";

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border py-3 text-sm first:border-t @min-[30rem]/activity:grid-cols-[5.5rem_minmax(0,1fr)_4rem_7rem]">
      <span className={cn(
        "justify-self-start rounded-md px-2 py-1 text-center text-xs font-semibold",
        isArrival
          ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
          : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
      )}>
        {isArrival ? "Arriving" : isDeparture ? "Departing" : "Completed"}
      </span>
      
      <div className="grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-2">
        <span className="flex h-4 w-6 items-center">
        {guests?.countryFlag && (
          <img src={guests.countryFlag} alt={guests.nationality ?? "Guest country"} className="h-4 w-6 shrink-0 rounded-sm object-cover" />
        )}
        </span>
        <span className="break-words font-medium" title={guests?.fullName}>{guests?.fullName ?? "Unknown guest"}</span>
      </div>
      <span className="whitespace-nowrap tabular-nums text-muted-foreground @min-[30rem]/activity:text-right">{numNights} {numNights === 1 ? "night" : "nights"}</span>
      <div className="flex justify-end [&>button]:w-full [&>a]:w-full">
      {isArrival && (
        <Button size="sm" render={<Link to={`/checkin/${id}`} />}>Check in</Button>
      )}
      {isDeparture && <CheckoutButton bookingId={id} />}
      </div>
    </li>
  );
}

export default TodayItem;
