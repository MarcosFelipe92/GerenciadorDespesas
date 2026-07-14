import db from "../../database/models/index";
import Categorias, {
  ICategorias,
} from "../../database/models/categorias.model";

export class CategoriasRepository {
  async getAll(): Promise<Categorias[]> {
    return db.Categorias.findAll({
      order: [["descricao", "ASC"]],
    });
  }

  async getById(id: number): Promise<Categorias | null> {
    return db.Categorias.findByPk(id);
  }

  async bulkCreate(
    categorias: Omit<ICategorias, "id">[],
  ): Promise<Categorias[]> {
    return db.Categorias.bulkCreate(categorias);
  }

  async update(
    id: number,
    dados: Partial<Omit<ICategorias, "id">>,
  ): Promise<number> {
    const [linhasAfetadas] = await db.Categorias.update(dados, {
      where: { id },
    });
    return linhasAfetadas;
  }

  async delete(id: number): Promise<number> {
    return await db.Categorias.destroy({
      where: { id },
    });
  }
}
