import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  excluirVeterinario,
} from "../services/veterinarioService";

export function useDeleteVeterinario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: excluirVeterinario,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["veterinarios"],
      });
    },
  });
}