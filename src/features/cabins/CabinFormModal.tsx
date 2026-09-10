import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import CreateCabinForm from "./CreateCabinForm"

interface CabinFormModalProps {
    isOpen: boolean
    onClose: () => void
    cabinToEdit?: Record<string, any> | null
}

export default function CabinFormModal({
    isOpen,
    onClose,
    cabinToEdit,
}: CabinFormModalProps) {
    const isEditSession = Boolean(cabinToEdit)

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditSession ? `Edit ${cabinToEdit?.name}` : "Add New Cabin"}
                    </DialogTitle>
                </DialogHeader>

                <CreateCabinForm
                    cabinToEdit={cabinToEdit ?? undefined}
                    onClose={onClose}
                />
            </DialogContent>
        </Dialog>
    )
}