import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  excluirAplicacaoVacina,
} from '../../services/aplicacaoVacinaService';

export function useDeleteAplicacaoVacina() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      excluirAplicacaoVacina,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'aplicacoesVacina',
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'aplicacoes-vacina',
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'pets',
        ],
      });
    },
  });
}