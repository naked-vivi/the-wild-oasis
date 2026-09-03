import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { toast } from "@/components/ui/toast";
import { deleteCabin, getCabins } from "@/services/apiCabins";
import Spinner from "@/shared/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function CabinTable() {

  const queryClient = useQueryClient();

  const { isPending, data: cabins, } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  });

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Cabin successfully deleted",
      });
      // Invalidate the cache to force a re-fetch of the updated cabin list
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      toast.add({
        type: "error",
        description: err.message || "Failed to delete cabin",
      });
    }
  })

  if (isPending) return <Spinner />

  return (
    <div>
      <Table className="border">
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead className="">Image</TableHead>
            <TableHead>Cabin</TableHead>
            <TableHead className="text-center">Capacity</TableHead>
            <TableHead className="text-end">Price</TableHead>
            <TableHead className="text-end">Discount</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cabins?.map(cabin =>
            <TableRow key={cabin.id}>
              <TableCell className="py-6">
                <img
                  src={cabin.image}
                  alt={cabin.name}
                  className="w-16 h-10 object-cover rounded-sm"
                />
              </TableCell>
              <TableCell className="font-medium">{cabin.name}</TableCell>
              <TableCell className="text-center">Fits up to {cabin.maxCapacity} guests</TableCell>
              <TableCell className="text-end">${cabin.regularPrice}</TableCell>
              <TableCell className="text-end text-green-500">{cabin.discount ? `$${cabin.discount}` : "—"}</TableCell>
              <TableCell className="text-end">
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={isDeleting}
                  onClick={() => mutate(cabin.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

