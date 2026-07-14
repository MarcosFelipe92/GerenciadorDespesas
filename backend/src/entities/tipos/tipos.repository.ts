import db from "../../database/models/index";
import Tipos, { ITipos } from "../../database/models/tipos.model";

export class TiposRepository {
  async getAll(): Promise<Tipos[]> {
    return db.Tipos.findAll();
  }

  async getById(id: number): Promise<Tipos | null> {
    return db.Tipos.findByPk(id);
  }

  async bulkCreate(tipos: Omit<ITipos, "id">[]): Promise<Tipos[]> {
    return db.Tipos.bulkCreate(tipos);
  }

  async update(
    id: number,
    dados: Partial<Omit<ITipos, "id">>,
  ): Promise<number> {
    const [linhasAfetadas] = await db.Tipos.update(dados, {
      where: { id },
    });
    return linhasAfetadas;
  }

  async delete(id: number): Promise<number> {
    return await db.Tipos.destroy({
      where: { id },
    });
  }
}
