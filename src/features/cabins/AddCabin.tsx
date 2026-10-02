
// import CreateCabinForm from "./CreateCabinForm"
import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CabinFormModal from "./CabinFormModal";

function AddCabin() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex items-center justify-start my-6">
            <Button className="w-full sm:w-auto" onClick={() => setIsOpen(true)}>Add new cabin</Button>

            <CabinFormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    )
}

export default AddCabin
