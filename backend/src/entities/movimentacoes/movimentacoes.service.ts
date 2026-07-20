import Movimentacoes, {
  IMovimentacoes,
} from "../../database/models/movimentacoes.model";

import {
  MovimentacoesRepository,
  TFiltrosMovimentacao,
} from "./movimentacoes.repository";

export class MovimentacoesService {
  private movimentacoesRepository: MovimentacoesRepository;

  constructor(movimentacoesRepository: MovimentacoesRepository) {
    this.movimentacoesRepository = movimentacoesRepository;
  }

  async getAll(filtros?: TFiltrosMovimentacao): Promise<Movimentacoes[]> {
    return this.movimentacoesRepository.getAll(filtros);
  }

  async getSaldoAnterior(dataInicio?: string): Promise<number> {
    if (!dataInicio) return 0;

    const [anoStr, mesStr, diaStr] = dataInicio.split("-");
    const ano = Number(anoStr);
    const mes = Number(mesStr);
    const dia = Number(diaStr);

    if (isNaN(ano) || isNaN(mes) || isNaN(dia)) return 0;

    const dataRef = new Date(Date.UTC(ano, mes - 1, dia));
    dataRef.setUTCDate(dataRef.getUTCDate() - 1);
    const dataFimAnterior = dataRef.toISOString().split("T")[0];

    const movimentacoesAnteriores = await this.movimentacoesRepository.getAll({
      dataFim: dataFimAnterior,
    });

    let saldo = 0;
    for (const mov of movimentacoesAnteriores) {
      const isEntrada = mov.tipo?.descricao === "Entrada" || mov.idTipo === 1;
      const valorNum = Number(mov.valor) || 0;
      if (isEntrada) {
        saldo += valorNum;
      } else {
        saldo -= valorNum;
      }
    }

    return saldo;
  }

  async getById(id: number): Promise<Movimentacoes | null> {
    return this.movimentacoesRepository.getById(id);
  }

  async bulkCreate(
    movimentacoes: Omit<IMovimentacoes, "id">[],
  ): Promise<Movimentacoes[]> {
    return this.movimentacoesRepository.bulkCreate(movimentacoes);
  }

  async update(
    id: number,
    dados: Partial<Omit<IMovimentacoes, "id">>,
  ): Promise<number> {
    if (dados.valor !== undefined && dados.valor <= 0) {
      throw new Error(
        "O valor da movimentação não pode ser menor ou igual a zero.",
      );
    }

    return this.movimentacoesRepository.update(id, dados);
  }

  async deletar(id: number): Promise<number> {
    return await this.movimentacoesRepository.delete(id);
  }
}
