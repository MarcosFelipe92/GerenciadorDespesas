import Movimentacoes, {
  IMovimentacoes,
} from "../../database/models/movimentacoes.model";

import {
  MovimentacoesRepository,
  TFiltrosMovimentacao,
} from "./movimentacoes.repository";

export type TResumoMensal = {
  mes: number;
  entradas: number;
  saidas: number;
  saldo: number;
};

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

  async getResumoAnual(anoParam?: number | string): Promise<TResumoMensal[]> {
    const ano = Number(anoParam) || new Date().getFullYear();
    const dataInicio = `${ano}-01-01`;
    const dataFim = `${ano}-12-31`;

    const totaisAgregados =
      await this.movimentacoesRepository.getTotaisAgregadosPorPeriodo(
        dataInicio,
        dataFim,
      );

    const resumo: TResumoMensal[] = Array.from({ length: 12 }, (_, i) => ({
      mes: i + 1,
      entradas: 0,
      saidas: 0,
      saldo: 0,
    }));

    totaisAgregados.forEach((item) => {
      const mesNum = Number(item.mes);
      const mesIndex = mesNum - 1;

      if (mesIndex >= 0 && mesIndex < 12) {
        const idTipoNum = Number(item.idTipo);
        const totalNum = Number(item.total) || 0;

        if (idTipoNum === 1) {
          resumo[mesIndex].entradas = totalNum;
        } else if (idTipoNum === 2) {
          resumo[mesIndex].saidas = totalNum;
        }
      }
    });

    resumo.forEach((r) => {
      r.saldo = r.entradas - r.saidas;
    });

    return resumo;
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
