import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePet } from '../../services/petService';

export function useUpdatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pet }) => updatePet(id, pet),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });

      queryClient.invalidateQueries({
        queryKey: ['pet', variables.id],
      });
    },
  });
}