import { useMutation } from '@tanstack/react-query';

import {
    loginUsuario,
} from '../../services/authService';

export function useLogin() {
    return useMutation({
        mutationFn: loginUsuario,
    });
}