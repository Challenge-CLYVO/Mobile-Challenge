import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteAplicacaoVacina,
} from '../../services/aplicacaoVacinaService';

export function useDeleteAplicacaoVacina() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAplicacaoVacina,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['aplicacoesVacina'],
      });
    },
  });
}