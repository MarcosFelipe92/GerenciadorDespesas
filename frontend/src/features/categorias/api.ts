import type { TCategoria } from "../../types/categorias.types";

const API_URL = "http://localhost:8080/categorias";

export const categoriasApi = {
  getAll: async (): Promise<TCategoria[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar categorias");
    return res.json();
  },
};
