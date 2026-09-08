import { useQuery } from '@tanstack/react-query';

import {
  getAplicacaoVacinaById,
} from '../../services/aplicacaoVacinaService';

export function useAplicacaoVacina(id) {
  return useQuery({
    queryKey: ['aplicacaoVacina', id],

    queryFn: () =>
      getAplicacaoVacinaById(id),

    enabled: !!id,
  });
}