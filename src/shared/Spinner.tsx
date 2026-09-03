import { Loader2 } from "lucide-react";

function Spinner() {
    return (
        <div className="flex items-center justify-center p-4">
            {/* animate-spin makes it rotate continuously */}
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
    );
}

export default Spinner;