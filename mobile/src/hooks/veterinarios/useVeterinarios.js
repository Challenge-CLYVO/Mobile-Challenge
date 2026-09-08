import { useQuery } from '@tanstack/react-query';

import {
  getVeterinarios,
} from '../../services/veterinarioService';

export function useVeterinarios() {
  return useQuery({
    queryKey: ['veterinarios'],
    queryFn: getVeterinarios,
  });
}