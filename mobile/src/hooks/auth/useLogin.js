import {
  useMutation,
} from '@tanstack/react-query';

import {
  loginUsuario,
} from '../../services/authService';

export function useLogin() {
  return useMutation({
    mutationFn: ({
      email,
      senha,
    }) =>
      loginUsuario(
        email,
        senha
      ),
  });
}