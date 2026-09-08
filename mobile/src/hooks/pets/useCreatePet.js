import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPet } from '../../services/petService';

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
    },
  });
}