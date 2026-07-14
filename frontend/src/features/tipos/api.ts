import type { TTipo } from "../../types/tipos.types";

const API_URL = "http://localhost:8080/tipos";

export const tiposApi = {
  getAll: async (): Promise<TTipo[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar tipos");
    return res.json();
  },
};
