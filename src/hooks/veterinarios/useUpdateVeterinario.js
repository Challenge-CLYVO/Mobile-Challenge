import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  atualizarVeterinario,
} from "../services/veterinarioService";

export function useUpdateVeterinario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, veterinario }) =>
      atualizarVeterinario(id, veterinario),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["veterinarios"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "veterinario",
          variables.id,
        ],
      });
    },
  });
}