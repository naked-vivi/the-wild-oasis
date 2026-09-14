import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

export interface SortOption {
    value: string;
    label: string;
}

interface SortByProps {
    options: SortOption[];
}

export default function SortBy({ options }: SortByProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current sort value or fallback to the first option
    const currentSort = searchParams.get("sortBy") || options[0]?.value || "";

    function handleChange(value: string) {
        searchParams.set("sortBy", value)
        setSearchParams(searchParams);
    }

    return (
        <Select value={currentSort} onValueChange={handleChange}>
            <SelectTrigger className="w-50">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}