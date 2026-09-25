import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All bookings
        </h1>
        <BookingTableOperations />
      </div>
      <BookingTable />
    </>
  );
}

export default Bookings;
