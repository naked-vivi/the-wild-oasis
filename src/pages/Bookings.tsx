import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
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
