import AddCabin from "@/features/cabins/AddCabin";
import CabinTable from "@/features/cabins/CabinTable";
import Filter from "@/shared/filter";
import SortBy from "@/shared/sortBy";

const sortOptions = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price (low first)" },
  { value: "regularPrice-desc", label: "Sort by price (high first)" },
  { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
];

function Cabins() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All cabins
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Filter
            filterField="discount"
            options={[
              { value: "all", label: "All" },
              { value: "with-discount", label: "With discount" },
              { value: "no-discount", label: "No discount" },
            ]}
          />
          <SortBy options={sortOptions} />
        </div>
      </div>

      <CabinTable />
      <AddCabin />
    </div>
  );
}

export default Cabins;
