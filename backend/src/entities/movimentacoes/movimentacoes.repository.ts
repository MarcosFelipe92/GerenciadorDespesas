import { Op } from "sequelize";
import db from "../../database/models/index";

import Movimentacoes, {
  IMovimentacoes,
} from "../../database/models/movimentacoes.model";

export type TFiltrosMovimentacao = {
  dataInicio?: string;
  dataFim?: string;
};

export type TAgregadoMensalRaw = {
  mes: number;
  idTipo: number;
  total: number;
};

export class MovimentacoesRepository {
  async getAll(filtros?: TFiltrosMovimentacao): Promise<Movimentacoes[]> {
    const where: any = {};

    const dataFilter: any = {};

    if (filtros?.dataInicio) {
      dataFilter[Op.gte] = filtros.dataInicio;
    }

    if (filtros?.dataFim) {
      dataFilter[Op.lte] = filtros.dataFim;
    }

    if (
      Object.keys(dataFilter).length > 0 ||
      Object.getOwnPropertySymbols(dataFilter).length > 0
    ) {
      where.data = dataFilter;
    }

    return db.Movimentacoes.findAll({
      where,
      include: [
        { model: db.Categorias, as: "categoria" },
        { model: db.Tipos, as: "tipo" },
      ],
      order: [["data", "DESC"]],
    });
  }

  async getTotaisAgregadosPorPeriodo(
    dataInicio: string,
    dataFim: string,
  ): Promise<TAgregadoMensalRaw[]> {
    const result = await db.Movimentacoes.findAll({
      attributes: [
        [db.Sequelize.literal(`EXTRACT(MONTH FROM "data")::INTEGER`), "mes"],
        "idTipo",
        [db.Sequelize.fn("SUM", db.Sequelize.col("valor")), "total"],
      ],
      where: {
        data: {
          [Op.between]: [dataInicio, dataFim],
        },
      },
      group: [db.Sequelize.literal(`EXTRACT(MONTH FROM "data")`), "idTipo"],
      raw: true,
    });

    return result as unknown as TAgregadoMensalRaw[];
  }

  async getById(id: number): Promise<Movimentacoes | null> {
    return db.Movimentacoes.findByPk(id, {
      include: [
        { model: db.Categorias, as: "categoria" },
        { model: db.Tipos, as: "tipo" },
      ],
    });
  }

  async bulkCreate(
    movimentacoes: Omit<IMovimentacoes, "id">[],
  ): Promise<Movimentacoes[]> {
    return db.Movimentacoes.bulkCreate(movimentacoes);
  }

  async update(
    id: number,
    dados: Partial<Omit<IMovimentacoes, "id">>,
  ): Promise<number> {
    const [linhasAfetadas] = await db.Movimentacoes.update(dados, {
      where: { id },
    });

    return linhasAfetadas;
  }

  async delete(id: number): Promise<number> {
    return await db.Movimentacoes.destroy({
      where: { id },
    });
  }
}
