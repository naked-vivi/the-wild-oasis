import { getSettings } from '@/services/apiSettings'
import { useQuery } from '@tanstack/react-query'

function useSettings() {
    const { isPending, error, data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    })

    return {
        isPending,
        error,
        settings
    }
}

export default useSettings