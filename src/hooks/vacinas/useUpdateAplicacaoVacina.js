import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atualizarAplicacaoVacina } from '../services/aplicacaoVacinaService';

export function useUpdateAplicacaoVacina() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, aplicacao }) =>
      atualizarAplicacaoVacina(id, aplicacao),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['aplicacoesVacina'],
      });
    },
  });
}