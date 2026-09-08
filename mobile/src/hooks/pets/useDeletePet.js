import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePet } from '../../services/petService';

export function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
    },
  });
}