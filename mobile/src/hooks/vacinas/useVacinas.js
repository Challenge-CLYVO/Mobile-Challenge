import { useQuery } from '@tanstack/react-query';
import { getVacinas } from '../../services/vacinaService';

export function useVacinas() {
  return useQuery({
    queryKey: ['vacinas'],
    queryFn: getVacinas,
  });
}