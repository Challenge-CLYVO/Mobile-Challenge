import { useQuery } from '@tanstack/react-query';
import { listarPets } from '../services/petService';

export function usePets() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: listarPets,
  });
}