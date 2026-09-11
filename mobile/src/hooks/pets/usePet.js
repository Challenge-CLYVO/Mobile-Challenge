import { useQuery } from '@tanstack/react-query';
import { getPetById } from '../../services/petService';

export function usePet(id) {
    return useQuery({
        queryKey: ['pet', id],
        queryFn: () => getPetById(id),
        enabled: !!id,
    });
}