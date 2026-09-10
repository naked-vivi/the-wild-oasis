import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import useDeleteCabin from "@/features/cabins/useDeleteCabin";

interface ConfirmDeleteProps {
    cabin: {
        id: number
        name: string
    }
    isOpen: boolean
    onClose: () => void
}

function ConfirmDelete({ cabin, isOpen, onClose }: ConfirmDeleteProps) {
    const { isDeleting, mutate } = useDeleteCabin();

    function handleDelete() {
        mutate(cabin.id, {
            onSuccess: () => onClose(),
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete cabin{" "}
                        <span className="font-semibold text-foreground">{cabin.name}</span>{" "}
                        from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        {isDeleting ? "Deleting..." : "Delete Cabin"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDelete

// Inside your table row:
