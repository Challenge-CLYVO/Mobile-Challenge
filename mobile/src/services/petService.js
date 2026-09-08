import api from './api';

export async function getPets() {
  const response = await api.get('/Pet');
  return response.data;
}

export async function getPetById(id) {
  const response = await api.get(`/Pet/${id}`);
  return response.data;
}

export async function createPet(pet) {
  const response = await api.post('/Pet', pet);
  return response.data;
}

export async function updatePet(id, pet) {
  const response = await api.put(`/Pet/${id}`, pet);
  return response.data;
}

export async function deletePet(id) {
  const response = await api.delete(`/Pet/${id}`);
  return response.data;
}