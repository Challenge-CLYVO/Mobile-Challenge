import { apiRequest } from '../config/api';

export async function listarPets() {
  return await apiRequest('/pet');
}

export async function buscarPetPorId(id) {
  return await apiRequest(`/pet/${id}`);
}

export async function criarPet(pet) {
  return await apiRequest('/pet', {
    method: 'POST',
    body: pet,
  });
}

export async function atualizarPet(id, pet) {
  return await apiRequest(`/pet/${id}`, {
    method: 'PUT',
    body: pet,
  });
}

export async function excluirPet(id) {
  return await apiRequest(`/pet/${id}`, {
    method: 'DELETE',
  });
}