import { useQuery } from "@tanstack/react-query";
import {
  listarPets,
  buscarPetPorId,
} from "../../services/petService";

export function usePets() {
  return useQuery({
    queryKey: ["pets"],
    queryFn: listarPets,
  });
}

export function usePet(id) {
  return useQuery({
    queryKey: ["pet", id],
    queryFn: () => buscarPetPorId(id),
    enabled: !!id,
  });
}