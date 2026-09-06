import { useQuery } from "@tanstack/react-query";
import {
  listarAplicacoesVacina,
  buscarAplicacaoVacinaPorId,
} from "../../services/aplicacaoVacinaService";

export function useAplicacoesVacina() {
  return useQuery({
    queryKey: ["aplicacoesVacina"],
    queryFn: listarAplicacoesVacina,
  });
}

export function useAplicacaoVacina(id) {
  return useQuery({
    queryKey: ["aplicacaoVacina", id],
    queryFn: () => buscarAplicacaoVacinaPorId(id),
    enabled: !!id,
  });
}