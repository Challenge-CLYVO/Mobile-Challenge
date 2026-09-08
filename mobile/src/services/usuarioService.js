import api from './api';

export async function getUsuarios() {
  const response = await api.get('/Usuario');

  return response.data;
}

export async function getUsuarioById(id) {
  const response = await api.get(
    `/Usuario/${id}`
  );

  return response.data;
}