import SortBy from "@/shared/sortBy";
import Filter from "@/shared/filter";


function BookingTableOperations() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
        ]}
      />
      <SortBy options={[
        { value: "startDate-desc", label: "Sort by date (recent first)" },
        { value: "startDate-asc", label: "Sort by date (earlier first)" },
        {
          value: "totalPrice-desc",
          label: "Sort by amount (high first)",
        },
        { value: "totalPrice-asc", label: "Sort by amount (low first)" },
      ]} />
    </div>

  );
}

export default BookingTableOperations;
