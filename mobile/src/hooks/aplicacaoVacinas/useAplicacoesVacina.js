import { useQuery } from '@tanstack/react-query';
import {
  getAplicacoesVacina,
} from '../../services/aplicacaoVacinaService';

export function useAplicacoesVacina() {
  return useQuery({
    queryKey: ['aplicacoesVacina'],
    queryFn: getAplicacoesVacina,
  });
}