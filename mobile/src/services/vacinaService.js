import api from './api';

export async function getVacinas() {
  const response = await api.get('/Vacina');

  return response.data;
}

export async function getVacinaById(id) {
  const response = await api.get(
    `/Vacina/${id}`
  );

  return response.data;
}