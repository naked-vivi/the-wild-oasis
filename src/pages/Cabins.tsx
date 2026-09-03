import { Button } from "@/components/ui/button";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";

import { useState } from "react";



function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All cabins
        </h1>
        <p className="text-lg text-muted-foreground">Filter / Sort</p>

      </div>
      <CabinTable />

      <div className="flex items-center justify-end my-6">
        <Button className="bg-blue-600 w-full h-12" onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
      </div>

      {showForm && <CreateCabinForm />}
    </div>
  );
}

export default Cabins;
