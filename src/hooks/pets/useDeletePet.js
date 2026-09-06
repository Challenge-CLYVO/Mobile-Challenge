import { useMutation, useQueryClient } from "@tanstack/react-query";
import { excluirPet } from "../../services/petService";

export function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: excluirPet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });
}