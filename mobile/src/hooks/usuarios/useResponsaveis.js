import { useQuery } from '@tanstack/react-query';

import {
  getResponsaveis,
} from '../../services/responsavelService';

export function useResponsaveis() {
  return useQuery({
    queryKey: ['responsaveis'],
    queryFn: getResponsaveis,
  });
}