import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router-dom";

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("discount") || "all";

    function handleFilterChange(value: string) {
        searchParams.set("discount", value);
        setSearchParams(searchParams);
    }
    return (
        <Tabs value={currentFilter} onValueChange={handleFilterChange}>
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="with-discount">With discount</TabsTrigger>
                <TabsTrigger value="no-discount">No discount</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default Filter