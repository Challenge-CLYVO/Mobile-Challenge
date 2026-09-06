import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  criarVeterinario,
} from "../services/veterinarioService";

export function useCreateVeterinario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: criarVeterinario,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["veterinarios"],
      });
    },
  });
}