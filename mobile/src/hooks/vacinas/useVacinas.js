import { useQuery } from "@tanstack/react-query";
import {
  listarVacinas,
  buscarVacinaPorId,
} from "../../services/vacinaService";

export function useVacinas() {
  return useQuery({
    queryKey: ["vacinas"],
    queryFn: listarVacinas,
  });
}

export function useVacina(id) {
  return useQuery({
    queryKey: ["vacina", id],
    queryFn: () => buscarVacinaPorId(id),
    enabled: !!id,
  });
}