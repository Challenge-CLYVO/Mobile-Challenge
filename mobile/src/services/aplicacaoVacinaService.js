import api from './api';

export async function getAplicacoesVacina() {
  const response =
    await api.get('/AplicacaoVacina');

  return response.data;
}

export async function getAplicacaoVacinaById(id) {
  const response =
    await api.get(
      `/AplicacaoVacina/${id}`
    );

  return response.data;
}

export async function createAplicacaoVacina(
  aplicacao
) {
  const response =
    await api.post(
      '/AplicacaoVacina',
      aplicacao
    );

  return response.data;
}

export async function updateAplicacaoVacina(
  id,
  aplicacao
) {
  const response =
    await api.put(
      `/AplicacaoVacina/${id}`,
      aplicacao
    );

  return response.data;
}

export async function deleteAplicacaoVacina(
  id
) {
  const response =
    await api.delete(
      `/AplicacaoVacina/${id}`
    );

  return response.data;
}