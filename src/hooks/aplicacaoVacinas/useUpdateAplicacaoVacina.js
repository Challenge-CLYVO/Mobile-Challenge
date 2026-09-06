import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  atualizarAplicacaoVacina,
} from "../../services/aplicacaoVacinaService";

export function useUpdateAplicacaoVacina() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, aplicacao }) =>
      atualizarAplicacaoVacina(id, aplicacao),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["aplicacoesVacina"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "aplicacaoVacina",
          variables.id,
        ],
      });
    },
  });
}