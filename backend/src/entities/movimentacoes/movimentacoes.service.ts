import Movimentacoes, {
  IMovimentacoes,
} from "../../database/models/movimentacoes.model";

import { MovimentacoesRepository } from "./movimentacoes.repository";

export class MovimentacoesService {
  private movimentacoesRepository: MovimentacoesRepository;

  constructor(movimentacoesRepository: MovimentacoesRepository) {
    this.movimentacoesRepository = movimentacoesRepository;
  }

  async getAll(): Promise<Movimentacoes[]> {
    return this.movimentacoesRepository.getAll();
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
