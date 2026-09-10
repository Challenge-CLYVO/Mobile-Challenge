import api from './api';

export async function listarVeterinarios() {
  const response = await api.get(
    '/Veterinario'
  );

  return response.data;
}

export async function buscarVeterinarioPorId(
  id
) {
  const response = await api.get(
    `/Veterinario/${id}`
  );

  return response.data;
}

export async function criarVeterinario(
  veterinario
) {
  const response = await api.post(
    '/Veterinario',
    veterinario
  );

  return response.data;
}

export async function atualizarVeterinario(
  id,
  veterinario
) {
  const response = await api.put(
    `/Veterinario/${id}`,
    veterinario
  );

  return response.data;
}

export async function excluirVeterinario(
  id
) {
  const response = await api.delete(
    `/Veterinario/${id}`
  );

  return response.data;
}