import api from "./api";

export async function listarUsuarios() {
  const response = await api.get("/Usuario");
  return response.data;
}

export async function buscarUsuarioPorId(id) {
  const response = await api.get(`/Usuario/${id}`);
  return response.data;
}