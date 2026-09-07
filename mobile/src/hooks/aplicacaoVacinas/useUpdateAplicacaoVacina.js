import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  atualizarAplicacaoVacina,
} from '../../services/aplicacaoVacinaService';

export function useUpdateAplicacaoVacina() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dados }) =>
      atualizarAplicacaoVacina(id, dados),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['aplicacoesVacina'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'aplicacaoVacina',
          variables.id,
        ],
      });
    },
  });
}