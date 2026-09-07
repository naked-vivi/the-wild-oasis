import { Button } from "@/components/ui/button"
import {
  Edit,
  Trash2,
  Copy
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import Spinner from "@/shared/Spinner";
import React, { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCabins from "./useCabins";
import useCreateCabin from "./useCreateCabin";

interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export default function CabinTable() {
  // Track the specific ID of the cabin being edited (or null)
  const [editingId, setEditingId] = useState<number | null>(null);
  const { isDeleting, mutate } = useDeleteCabin();
  const { isCreating, createCabinMutate } = useCreateCabin();

  function handleDuplicate(cabin: Cabin) {
    const { name, maxCapacity, regularPrice, discount, image, description } = cabin;
    createCabinMutate({
      name: `${name} (Copy)`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }


  const { isPending, cabins } = useCabins();
  if (isPending) return <Spinner />;

  return (
    <Table className="border">
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Cabin</TableHead>
          <TableHead className="text-center">Capacity</TableHead>
          <TableHead className="text-end">Price</TableHead>
          <TableHead className="text-end">Discount</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cabins?.map((cabin) => {
          const isEditing = editingId === cabin.id;

          return (
            <React.Fragment key={cabin.id}>
              {/* Main Data Row */}
              <TableRow>
                <TableCell className="py-6">
                  <img
                    src={cabin.image}
                    alt={cabin.name}
                    className="w-16 h-10 object-cover rounded-sm"
                  />
                </TableCell>
                <TableCell className="font-medium">{cabin.name}</TableCell>
                <TableCell className="text-center">
                  Fits up to {cabin.maxCapacity} guests
                </TableCell>
                <TableCell className="text-end">${cabin.regularPrice}</TableCell>
                <TableCell className="text-end text-green-500">
                  {cabin.discount ? `$${cabin.discount}` : "—"}
                </TableCell>
                <TableCell className="text-end space-x-2">
                  <Button
                    variant="secondary"
                    className="cursor-pointer"
                    disabled={isCreating}
                    onClick={() => handleDuplicate(cabin)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setEditingId(isEditing ? null : cabin.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={isDeleting}
                    onClick={() => mutate(cabin.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>

              {/* Collapsible Edit Row spanning all 6 columns */}
              {isEditing && (
                <TableRow>
                  <TableCell colSpan={6} className="bg-muted/30 p-4">
                    <CreateCabinForm
                      cabinToEdit={cabin}
                      onClose={() => setEditingId(null)}
                    />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}
