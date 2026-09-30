import { BedDouble, CalendarCheck, DollarSign, UserCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Stat from "./Stat";

type StatsProps = {
    bookings: { totalPrice: number | null }[];
    confirmedStays: readonly { numNights: number | null }[];
    numDays: number;
    cabinCount: number;
};

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
    const sales = bookings.reduce((total, booking) => total + (booking.totalPrice ?? 0), 0);
    
    const occupiedNights = confirmedStays.reduce((total, stay) => total + (stay.numNights ?? 0), 0);
    const availableNights = numDays * cabinCount;
    const occupancyRate = availableNights > 0 ? occupiedNights / availableNights : 0;

    return (
        <>
            <Stat title="Total Bookings" value={bookings.length} icon={<CalendarCheck />} color="blue" />
            <Stat title="Sales" value={formatCurrency(sales)} icon={<DollarSign />} color="green" />
            <Stat title="Check-ins" value={confirmedStays.length} icon={<UserCheck />} color="indigo" />
            <Stat title="Occupancy Rate" value={`${Math.round(occupancyRate * 100)}%`} icon={<BedDouble />} color="yellow" />
        </>
    );
}

export default Stats;
