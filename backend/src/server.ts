import express from "express";
import cors from "cors";

import { MovimentacoesRepository } from "./entities/movimentacoes/movimentacoes.repository.js";
import { MovimentacoesService } from "./entities/movimentacoes/movimentacoes.service.js";
import { MovimentacoesController } from "./entities/movimentacoes/movimentacoes.controller.js";

import { CategoriasRepository } from "./entities/categorias/categorias.repository.js";
import { CategoriasService } from "./entities/categorias/categorias.service.js";
import { CategoriasController } from "./entities/categorias/categorias.controller.js";

import { TiposRepository } from "./entities/tipos/tipos.repository.js";
import { TiposService } from "./entities/tipos/tipos.service.js";
import { TiposController } from "./entities/tipos/tipos.controller.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const movimentacoesRepository = new MovimentacoesRepository();
const movimentacoesService = new MovimentacoesService(movimentacoesRepository);
const movimentacoesController = new MovimentacoesController(
  movimentacoesService,
);

const categoriasRepository = new CategoriasRepository();
const categoriasService = new CategoriasService(categoriasRepository);
const categoriasController = new CategoriasController(categoriasService);

const tiposRepository = new TiposRepository();
const tiposService = new TiposService(tiposRepository);
const tiposController = new TiposController(tiposService);

app.get("/movimentacoes", movimentacoesController.getAll);
app.get("/movimentacoes/saldo-anterior", movimentacoesController.getSaldoAnterior);
app.get("/movimentacoes/:id", movimentacoesController.getById);
app.post("/movimentacoes", movimentacoesController.bulkCreate);
app.put("/movimentacoes/:id", movimentacoesController.update);
app.delete("/movimentacoes/:id", movimentacoesController.delete);

app.get("/categorias", categoriasController.getAll);
app.get("/categorias/:id", categoriasController.getById);
app.post("/categorias", categoriasController.bulkCreate);
app.put("/categorias/:id", categoriasController.update);
app.delete("/categorias/:id", categoriasController.delete);

app.get("/tipos", tiposController.getAll);
app.get("/tipos/:id", tiposController.getById);
app.post("/tipos", tiposController.bulkCreate);
app.put("/tipos/:id", tiposController.update);
app.delete("/tipos/:id", tiposController.delete);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta: ${port}`);
});
