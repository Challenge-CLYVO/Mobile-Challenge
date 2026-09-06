import { useQuery } from "@tanstack/react-query";
import {
  listarUsuarios,
  buscarUsuarioPorId,
} from "../../services/usuarioService";

export function useUsuarios() {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: listarUsuarios,
  });
}

export function useUsuario(id) {
  return useQuery({
    queryKey: ["usuario", id],
    queryFn: () => buscarUsuarioPorId(id),
    enabled: !!id,
  });
}