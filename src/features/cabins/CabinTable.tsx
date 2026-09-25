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
import useDeleteCabin from "./useDeleteCabin"
import CabinFormModal from "./CabinFormModal"
import { useSearchParams } from "react-router-dom"

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
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin()
  const { isPending, cabins } = useCabins()
  const [searchParams] = useSearchParams()

  // 1. Return early BEFORE doing array operations on 'cabins'
  if (isPending) return <Spinner />

  // Ensure cabins is always an array
  const cabinList = cabins || []

  // 2. FILTER LOGIC
  const filterValue = searchParams.get("discount") || "all"
  let filteredCabins = cabinList

  if (filterValue === "no-discount") {
    filteredCabins = cabinList.filter((cabin) => cabin.discount === 0)
  } else if (filterValue === "with-discount") {
    filteredCabins = cabinList.filter((cabin) => cabin.discount > 0)
  }

  // 3. SORT LOGIC
  const sortBy = searchParams.get("sortBy") || "name-asc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const aVal = a[field as keyof Cabin]
    const bVal = b[field as keyof Cabin]

    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal) * modifier
    }
    return ((aVal as number) - (bVal as number)) * modifier
  })

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
          {sortedCabins.map((cabin) => (
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

                    <DropdownMenuItem onClick={() => setEditingCabin(cabin)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>

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
          resourceName="Cabin"
          itemName={deletingCabin.name}
          isDeleting={isDeleting}
          onConfirm={() => deleteCabin(deletingCabin.id, {
            onSuccess: () => setDeletingCabin(null),
          })}
          isOpen={Boolean(deletingCabin)}
          onClose={() => setDeletingCabin(null)}
        />
      )}
    </>
  )
}
