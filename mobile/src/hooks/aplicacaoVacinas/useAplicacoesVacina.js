import { useQuery } from '@tanstack/react-query';
import {
  listarAplicacoesVacina,
} from '../../services/aplicacaoVacinaService';

export function useAplicacoesVacina() {
  return useQuery({
    queryKey: ['aplicacoesVacina'],
    queryFn: listarAplicacoesVacina,
  });
}