import { useEffect, useState } from "react";
import { SecaoCategorias } from "../features/categorias/components/SecaoCategorias";
import { categoriasApi } from "../features/categorias/api";
import type { TCreateCategoriaPayload } from "../features/categorias/api";
import type { TCategoria } from "../types/categorias.types";

export function Categorias() {
  const [categorias, setCategorias] = useState<TCategoria[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  const carregarCategorias = async () => {
    try {
      const dados = await categoriasApi.getAll();
      setCategorias(dados);
    } catch (err: any) {
      setErro(err.message || "Erro ao buscar categorias");
    }
  };

  useEffect(() => {
    carregarCategorias().finally(() => setCarregando(false));
  }, []);

  const handleCreateCategoria = async (payload: TCreateCategoriaPayload) => {
    await categoriasApi.create(payload);
    await carregarCategorias();
  };

  const handleUpdateCategoria = async (
    id: number,
    payload: Partial<TCreateCategoriaPayload>,
  ) => {
    await categoriasApi.update(id, payload);
    await carregarCategorias();
  };

  const handleDeleteCategoria = async (id: number) => {
    try {
      await categoriasApi.delete(id);
      await carregarCategorias();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir categoria");
    }
  };

  if (erro) return <div className="p-6 text-red-500">Erro: {erro}</div>;
  if (carregando)
    return <div className="p-6 text-zinc-500">Carregando categorias...</div>;

  return (
    <SecaoCategorias
      categorias={categorias}
      onCreate={handleCreateCategoria}
      onEditar={handleUpdateCategoria}
      onExcluir={handleDeleteCategoria}
    />
  );
}