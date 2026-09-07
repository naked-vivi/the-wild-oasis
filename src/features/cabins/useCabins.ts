import { getCabins } from '@/services/apiCabins';
import { useQuery } from '@tanstack/react-query';

function useCabins() {
    const { isPending, data: cabins } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    });

    return { isPending, cabins };
}

export default useCabins