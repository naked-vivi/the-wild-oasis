// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useSearchParams } from "react-router-dom";

// function Filter() {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const currentFilter = searchParams.get("discount") || "all";

//     function handleFilterChange(value: string) {
//         searchParams.set("discount", value);
//         setSearchParams(searchParams);
//     }
//     return (
//         <Tabs value={currentFilter} onValueChange={handleFilterChange}>
//             <TabsList>
//                 <TabsTrigger value="all">All</TabsTrigger>
//                 <TabsTrigger value="with-discount">With discount</TabsTrigger>
//                 <TabsTrigger value="no-discount">No discount</TabsTrigger>
//             </TabsList>
//         </Tabs>
//     );
// }

// export default Filter

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export interface FilterOption {
    value: string;
    label: string;
}

interface FilterProps {
    filterField: string;
    options: FilterOption[];
}

export default function Filter({ filterField, options }: FilterProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Active filter or default to first option
    const currentFilter = searchParams.get(filterField) || options[0]?.value || "";

    function handleFilterChange(value: string) {
        searchParams.set(filterField, value);
        // Reset page number to 1 when changing filters if using pagination
        if (searchParams.get("page")) searchParams.set("page", "1");
        setSearchParams(searchParams);
    }

    return (
        <Tabs value={currentFilter} onValueChange={handleFilterChange}>
            <TabsList>
                {options.map((option) => (
                    <TabsTrigger key={option.value} value={option.value}>
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}