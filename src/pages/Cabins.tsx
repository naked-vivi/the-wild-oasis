import AddCabin from "@/features/cabins/AddCabin";
import CabinTable from "@/features/cabins/CabinTable";
import Filter from "@/shared/filter";

function Cabins() {


  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All cabins
        </h1>
        <Filter />

      </div>
      <CabinTable />

      <AddCabin />
    </div>
  );
}

export default Cabins;
