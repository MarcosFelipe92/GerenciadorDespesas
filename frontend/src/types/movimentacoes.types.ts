import type { TCategoria } from "./categorias.types";
import type { TTipo } from "./tipos.types";

export type TMovimentacao = {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  paga: boolean;
  idTipo: number;
  idCategoria: number;
  categoria?: TCategoria;
  tipo?: TTipo;
};
