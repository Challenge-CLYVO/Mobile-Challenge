import api from './api';

export async function loginUsuario(
  email,
  senha
) {
  const response =
    await api.post(
      '/Auth/login',
      {
        email,
        senha,
      }
    );

  return response.data;
}

export async function registrarUsuario(
  dados
) {
  const response =
    await api.post(
      '/Auth/register',
      dados
    );

  return response.data;
}

export async function registrarVeterinario(
  dados
) {
  const response =
    await api.post(
      '/Auth/register-veterinario',
      dados
    );

  return response.data;
}