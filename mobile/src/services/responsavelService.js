import api from './api';

export async function getResponsaveis() {
  const response = await api.get('/Responsavel');

  return response.data;
}

export async function getResponsavelById(id) {
  const response = await api.get(
    `/Responsavel/${id}`
  );

  return response.data;
}