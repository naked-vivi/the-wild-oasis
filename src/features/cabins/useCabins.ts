import { getCabins } from '@/services/apiCabins';
import { useQuery } from '@tanstack/react-query';

function useCabins() {
    const { isPending, error, data: cabins } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    });

    return { isPending, error, cabins };
}

export default useCabins