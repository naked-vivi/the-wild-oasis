import AddCabin from "@/features/cabins/AddCabin";
import CabinTable from "@/features/cabins/CabinTable";

function Cabins() {


  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All cabins
        </h1>
        <p className="text-lg text-muted-foreground">Filter / Sort</p>

      </div>
      <CabinTable />

      <AddCabin />
    </div>
  );
}

export default Cabins;
