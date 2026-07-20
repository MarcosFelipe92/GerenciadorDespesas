import type { TCategoria } from "../../types/categorias.types";

export type TCreateCategoriaPayload = {
  descricao: string;
};

const API_URL = "http://localhost:8080/categorias";

export const categoriasApi = {
  getAll: async (): Promise<TCategoria[]> => {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error("Erro ao buscar categorias");
    return res.json();
  },

  create: async (
    categoria: TCreateCategoriaPayload,
  ): Promise<TCategoria[]> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([categoria]),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao cadastrar categoria");
    }
    return res.json();
  },

  update: async (
    id: number,
    categoria: Partial<TCreateCategoriaPayload>,
  ): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao atualizar categoria");
    }
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao excluir categoria");
    }
  },
};
