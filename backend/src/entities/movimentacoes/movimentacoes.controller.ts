import { Request, Response } from "express";
import { MovimentacoesService } from "./movimentacoes.service";

export class MovimentacoesController {
  private movimentacoesService: MovimentacoesService;

  constructor(movimentacoesService: MovimentacoesService) {
    this.movimentacoesService = movimentacoesService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { dataInicio, dataFim } = req.query;
      const filtros = {
        dataInicio: typeof dataInicio === "string" ? dataInicio : undefined,
        dataFim: typeof dataFim === "string" ? dataFim : undefined,
      };

      const result = await this.movimentacoesService.getAll(filtros);
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  };

  getSaldoAnterior = async (req: Request, res: Response): Promise<void> => {
    try {
      const { dataInicio } = req.query;
      const dataInicioStr =
        typeof dataInicio === "string" ? dataInicio : undefined;

      const saldo =
        await this.movimentacoesService.getSaldoAnterior(dataInicioStr);

      res.status(200).json({ saldoAnterior: saldo });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  };

  getResumoAnual = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ano } = req.query;
      const anoNum = typeof ano === "string" ? Number(ano) : undefined;

      const result = await this.movimentacoesService.getResumoAnual(anoNum);
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "ID informado é inválido." });
        return;
      }

      const result = await this.movimentacoesService.getById(id);

      if (!result) {
        res.status(404).json({ error: "Movimentação não encontrada." });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  bulkCreate = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.movimentacoesService.bulkCreate(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido." });
        return;
      }

      const linhasAfetadas = await this.movimentacoesService.update(
        id,
        req.body,
      );

      if (linhasAfetadas === 0) {
        res
          .status(404)
          .json({ error: "Movimentação não encontrada para atualização." });
        return;
      }

      res.status(200).json({ message: "Movimentação updated com sucesso." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido." });
        return;
      }

      const linhasAfetadas = await this.movimentacoesService.deletar(id);

      if (linhasAfetadas === 0) {
        res
          .status(404)
          .json({ error: "Movimentação não encontrada para exclusão." });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
