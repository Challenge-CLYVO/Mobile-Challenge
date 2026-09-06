import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  criarAplicacaoVacina,
} from "../../services/aplicacaoVacinaService";

export function useCreateAplicacaoVacina() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: criarAplicacaoVacina,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["aplicacoesVacina"],
      });

      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });
}