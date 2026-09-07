import api from "./api";

export async function listarVacinas() {
  const response = await api.get("/Vacina");
  return response.data;
}

export async function buscarVacinaPorId(id) {
  const response = await api.get(`/Vacina/${id}`);
  return response.data;
}