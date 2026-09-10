import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ConfirmDelete from "@/shared/confirmDelete"
import Spinner from "@/shared/Spinner"
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import useCabins from "./useCabins"
import useCreateCabin from "./useCreateCabin"
import CabinFormModal from "./CabinFormModal"

interface Cabin {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string
  description: string
}

export default function CabinTable() {
  const [editingCabin, setEditingCabin] = useState<Cabin | null>(null)
  const [deletingCabin, setDeletingCabin] = useState<Cabin | null>(null)

  const { isCreating, createCabinMutate } = useCreateCabin()
  const { isPending, cabins } = useCabins()

  function handleDuplicate(cabin: Cabin) {
    const { name, maxCapacity, regularPrice, discount, image, description } = cabin
    createCabinMutate({
      name: `${name} (Copy)`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }

  if (isPending) return <Spinner />

  return (
    <>
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
          {cabins?.map((cabin) => (
            <TableRow key={cabin.id}>
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
              <TableCell className="text-end">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      disabled={isCreating}
                      onClick={() => handleDuplicate(cabin)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>

                    {/* Pure state change - No DialogTrigger wrapper needed */}
                    <DropdownMenuItem onClick={() => setEditingCabin(cabin)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>

                    {/* Pure state change - No AlertDialogTrigger wrapper needed */}
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={() => setDeletingCabin(cabin)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CabinFormModal
        isOpen={Boolean(editingCabin)}
        cabinToEdit={editingCabin}
        onClose={() => setEditingCabin(null)}
      />

      {deletingCabin && (
        <ConfirmDelete
          cabin={deletingCabin}
          isOpen={Boolean(deletingCabin)}
          onClose={() => setDeletingCabin(null)}
        />
      )}
    </>
  )
}