import type { TMovimentacao } from "../../types/movimentacoes.types";

export type TMovimentacaoFiltros = {
  dataInicio?: string;
  dataFim?: string;
};

export type TResumoMensal = {
  mes: number;
  entradas: number;
  saidas: number;
  saldo: number;
};

export type TCreateMovimentacaoPayload = {
  descricao: string;
  valor: number;
  idTipo: number;
  idCategoria: number;
  data: string;
  paga?: boolean;
};

const API_URL = "http://localhost:8080/movimentacoes";

export const movimentacoesApi = {
  getAll: async (filtros?: TMovimentacaoFiltros): Promise<TMovimentacao[]> => {
    const params = new URLSearchParams();
    if (filtros?.dataInicio) params.append("dataInicio", filtros.dataInicio);
    if (filtros?.dataFim) params.append("dataFim", filtros.dataFim);

    const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Erro ao buscar movimentações");
    return res.json();
  },

  getSaldoAnterior: async (dataInicio?: string): Promise<number> => {
    if (!dataInicio) return 0;
    const url = `${API_URL}/saldo-anterior?dataInicio=${encodeURIComponent(dataInicio)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Erro ao buscar saldo anterior");
    const data = await res.json();
    return data.saldoAnterior || 0;
  },

  getResumoAnual: async (ano?: number): Promise<TResumoMensal[]> => {
    const anoParam = ano || new Date().getFullYear();
    const url = `${API_URL}/resumo-anual?ano=${anoParam}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Erro ao buscar resumo anual");
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

  update: async (
    id: number,
    movimentacao: Partial<TCreateMovimentacaoPayload>,
  ): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movimentacao),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao atualizar movimentação");
    }
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao excluir movimentação");
    }
  },
};
