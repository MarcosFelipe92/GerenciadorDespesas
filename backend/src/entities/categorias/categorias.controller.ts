import { Request, Response } from "express";
import { CategoriasService } from "./categorias.service";

export class CategoriasController {
  private categoriasService: CategoriasService;

  constructor(categoriasService: CategoriasService) {
    this.categoriasService = categoriasService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.categoriasService.getAll();
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

      const result = await this.categoriasService.getById(id);
      if (!result) {
        res.status(404).json({ error: "Categoria não encontrada." });
        return;
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  bulkCreate = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.categoriasService.bulkCreate(req.body);
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

      const linhasAfetadas = await this.categoriasService.update(id, req.body);
      if (linhasAfetadas === 0) {
        res
          .status(404)
          .json({ error: "Categoria não encontrada para atualização." });
        return;
      }

      res.status(200).json({ message: "Categoria atualizada com sucesso." });
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

      const linhasAfetadas = await this.categoriasService.deletar(id);
      if (linhasAfetadas === 0) {
        res
          .status(404)
          .json({ error: "Categoria não encontrada para exclusão." });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
