import db from "../../database/models/index";

import Movimentacoes, {
  IMovimentacoes,
} from "../../database/models/movimentacoes.model";

export class MovimentacoesRepository {
  async getAll(): Promise<Movimentacoes[]> {
    return db.Movimentacoes.findAll({
      include: [
        { model: db.Categorias, as: "categoria" },
        { model: db.Tipos, as: "tipo" },
      ],
      order: [["data", "DESC"]],
    });
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
