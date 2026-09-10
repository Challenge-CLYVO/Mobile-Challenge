import {
  useQuery,
} from '@tanstack/react-query';

import {
  listarVeterinarios,
} from '../../services/veterinarioService';

export function useVeterinarios() {
  return useQuery({
    queryKey: [
      'veterinarios',
    ],

    queryFn: () =>
      listarVeterinarios(),
  });
}