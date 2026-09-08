import api from './api';

export async function loginUsuario(dados) {
    const response = await api.post(
        '/Auth/login',
        dados
    );

    return response.data;
}

export async function registrarUsuario(dados) {
    const response = await api.post(
        '/Auth/register',
        dados
    );

    return response.data;
}