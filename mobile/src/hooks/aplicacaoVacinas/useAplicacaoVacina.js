import { useQuery } from '@tanstack/react-query';
import {
  buscarAplicacaoVacinaPorId,
} from '../../services/aplicacaoVacinaService';

export function useAplicacaoVacina(id) {
  return useQuery({
    queryKey: ['aplicacaoVacina', id],
    queryFn: () =>
      buscarAplicacaoVacinaPorId(id),
    enabled: !!id,
  });
}