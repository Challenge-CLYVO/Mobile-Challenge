import { apiRequest } from '../config/api';

export async function listarAplicacoesVacina() {
  return await apiRequest('/aplicacao-vacina');
}

export async function buscarAplicacaoVacinaPorId(id) {
  return await apiRequest(`/aplicacao-vacina/${id}`);
}

export async function criarAplicacaoVacina(aplicacao) {
  return await apiRequest('/aplicacao-vacina', {
    method: 'POST',
    body: aplicacao,
  });
}

export async function atualizarAplicacaoVacina(id, aplicacao) {
  return await apiRequest(`/aplicacao-vacina/${id}`, {
    method: 'PUT',
    body: aplicacao,
  });
}

export async function excluirAplicacaoVacina(id) {
  return await apiRequest(`/aplicacao-vacina/${id}`, {
    method: 'DELETE',
  });
}