import { useQuery } from '@tanstack/react-query';

import {
  listarVeterinarios,
  buscarVeterinarioPorId,
} from '../../services/veterinarioService';

export function useVeterinarios() {
  return useQuery({
    queryKey: ['veterinarios'],
    queryFn: listarVeterinarios,
  });
}

export function useVeterinario(id) {
  return useQuery({
    queryKey: ['veterinario', id],
    queryFn: () => buscarVeterinarioPorId(id),
    enabled: !!id,
  });
}