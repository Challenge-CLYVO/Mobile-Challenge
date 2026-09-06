import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarPet } from "../../services/petService";

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: criarPet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });
}