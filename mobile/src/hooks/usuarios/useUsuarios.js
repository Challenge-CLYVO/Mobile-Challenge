import { useQuery } from '@tanstack/react-query';

import {
  getUsuarios,
} from '../../services/usuarioService';

export function useUsuarios() {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsuarios,
  });
}