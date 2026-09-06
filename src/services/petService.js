import api from "./api";

export async function listarPets() {
  const response = await api.get("/Pet");
  return response.data;
}

export async function buscarPetPorId(id) {
  const response = await api.get(`/Pet/${id}`);
  return response.data;
}

export async function criarPet(pet) {
  const response = await api.post("/Pet", pet);
  return response.data;
}

export async function atualizarPet(id, pet) {
  const response = await api.put(`/Pet/${id}`, pet);
  return response.data;
}

export async function excluirPet(id) {
  const response = await api.delete(`/Pet/${id}`);
  return response.data;
}