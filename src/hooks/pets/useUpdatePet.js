import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atualizarPet } from '../services/petService';

export function useUpdatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pet }) => atualizarPet(id, pet),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
    },
  });
}