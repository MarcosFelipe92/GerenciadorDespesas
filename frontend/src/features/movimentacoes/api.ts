import type { TMovimentacao } from "../../types/movimentacoes.types";

export type TCreateMovimentacaoPayload = {
  descricao: string;
  valor: number;
  idTipo: number;
  categoriaId: number;
};

const API_URL = "http://localhost:8080/movimentacoes";

export const movimentacoesApi = {
  getAll: async (): Promise<TMovimentacao[]> => {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error("Erro ao buscar movimentações");
    return res.json();
  },

  create: async (
    movimentacao: TCreateMovimentacaoPayload,
  ): Promise<TMovimentacao[]> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([movimentacao]),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao cadastrar movimentação");
    }
    return res.json();
  },
};
