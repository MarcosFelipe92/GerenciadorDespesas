import Categorias, {
  ICategorias,
} from "../../database/models/categorias.model";
import { CategoriasRepository } from "./categorias.repository";

export class CategoriasService {
  private categoriasRepository: CategoriasRepository;

  constructor(categoriasRepository: CategoriasRepository) {
    this.categoriasRepository = categoriasRepository;
  }

  async getAll(): Promise<Categorias[]> {
    return this.categoriasRepository.getAll();
  }

  async getById(id: number): Promise<Categorias | null> {
    return this.categoriasRepository.getById(id);
  }

  async bulkCreate(
    categorias: Omit<ICategorias, "id">[],
  ): Promise<Categorias[]> {
    return this.categoriasRepository.bulkCreate(categorias);
  }

  async update(
    id: number,
    dados: Partial<Omit<ICategorias, "id">>,
  ): Promise<number> {
    if (dados.descricao !== undefined && dados.descricao.trim() === "") {
      throw new Error("A descrição da categoria não pode ser vazia.");
    }
    return this.categoriasRepository.update(id, dados);
  }

  async deletar(id: number): Promise<number> {
    return await this.categoriasRepository.delete(id);
  }
}
