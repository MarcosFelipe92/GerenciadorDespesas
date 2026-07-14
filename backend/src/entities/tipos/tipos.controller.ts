import { Request, Response } from "express";
import { TiposService } from "./tipos.service";

export class TiposController {
  private tiposService: TiposService;

  constructor(tiposService: TiposService) {
    this.tiposService = tiposService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.tiposService.getAll();
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
        res.status(400).json({ error: "ID inválido." });
        return;
      }

      const result = await this.tiposService.getById(id);
      if (!result) {
        res.status(404).json({ error: "Tipo não encontrado." });
        return;
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  bulkCreate = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.tiposService.bulkCreate(req.body);
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

      const linhasAfetadas = await this.tiposService.update(id, req.body);
      if (linhasAfetadas === 0) {
        res
          .status(404)
          .json({ error: "Tipo não encontrado para atualização." });
        return;
      }

      res.status(200).json({ message: "Tipo atualizado com sucesso." });
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

      const linhasAfetadas = await this.tiposService.deletar(id);
      if (linhasAfetadas === 0) {
        res.status(404).json({ error: "Tipo não encontrado para exclusão." });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
