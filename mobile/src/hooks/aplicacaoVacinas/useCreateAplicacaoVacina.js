import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createAplicacaoVacina,
} from '../../services/aplicacaoVacinaService';

export function useCreateAplicacaoVacina() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAplicacaoVacina,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['aplicacoesVacina'],
      });
    },
  });
}