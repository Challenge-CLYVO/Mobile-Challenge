import { useMutation } from '@tanstack/react-query';
import { registrarVeterinario } from '../../services/authService';

export function useRegisterVeterinario() {
    return useMutation({
        mutationFn: (dados) => registrarVeterinario(dados),
    });
}