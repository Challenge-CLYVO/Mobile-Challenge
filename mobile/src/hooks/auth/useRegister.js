import { useMutation } from '@tanstack/react-query';

import {
    registrarUsuario,
} from '../../services/authService';

export function useRegister() {
    return useMutation({
        mutationFn: registrarUsuario,
    });
}