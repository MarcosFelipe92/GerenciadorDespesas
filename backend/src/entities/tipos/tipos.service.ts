import Tipos, { ITipos } from "../../database/models/tipos.model";
import { TiposRepository } from "./tipos.repository";

export class TiposService {
  private tiposRepository: TiposRepository;

  constructor(tiposRepository: TiposRepository) {
    this.tiposRepository = tiposRepository;
  }

  async getAll(): Promise<Tipos[]> {
    return this.tiposRepository.getAll();
  }

  async getById(id: number): Promise<Tipos | null> {
    return this.tiposRepository.getById(id);
  }

  async bulkCreate(tipos: Omit<ITipos, "id">[]): Promise<Tipos[]> {
    return this.tiposRepository.bulkCreate(tipos);
  }

  async update(
    id: number,
    dados: Partial<Omit<ITipos, "id">>,
  ): Promise<number> {
    if (dados.descricao !== undefined && dados.descricao.trim() === "") {
      throw new Error("A descrição do tipo não pode ser vazia.");
    }
    return this.tiposRepository.update(id, dados);
  }

  async deletar(id: number): Promise<number> {
    return await this.tiposRepository.delete(id);
  }
}
