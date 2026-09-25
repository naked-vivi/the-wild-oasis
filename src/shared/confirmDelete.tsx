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

interface ConfirmDeleteProps {
    resourceName: string
    itemName: string
    onConfirm: () => void
    isDeleting: boolean
    isOpen: boolean
    onClose: () => void
}

function ConfirmDelete({ resourceName, itemName, onConfirm, isDeleting, isOpen, onClose }: ConfirmDeleteProps) {

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {resourceName.toLowerCase()}{" "}
                        <span className="font-semibold text-foreground">{itemName}</span>{" "}
                        from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting} onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeleting}
                        onClick={onConfirm}
                    >
                        {isDeleting ? "Deleting..." : `Delete ${resourceName}`}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDelete

// Inside your table row:
