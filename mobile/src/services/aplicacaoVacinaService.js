import api from './api';

export async function listarAplicacoesVacina() {
  const response = await api.get(
    '/AplicacaoVacina'
  );

  return response.data;
}

export async function buscarAplicacaoVacinaPorId(
  id
) {
  const response = await api.get(
    `/AplicacaoVacina/${id}`
  );

  return response.data;
}

export async function criarAplicacaoVacina(
  aplicacao
) {
  const response = await api.post(
    '/AplicacaoVacina',
    aplicacao
  );

  return response.data;
}

export async function atualizarAplicacaoVacina(
  id,
  aplicacao
) {
  const response = await api.put(
    `/AplicacaoVacina/${id}`,
    aplicacao
  );

  return response.data;
}

export async function excluirAplicacaoVacina(
  id
) {
  const response = await api.delete(
    `/AplicacaoVacina/${id}`
  );

  return response.data;
}