import { useEffect, useState } from "react";
import { SecaoMovimentacoes } from "../features/movimentacoes/components/SecaoMovimentacoes";
import { movimentacoesApi } from "../features/movimentacoes/api";
import type { TCreateMovimentacaoPayload } from "../features/movimentacoes/api";
import { categoriasApi } from "../features/categorias/api";
import type { TMovimentacao } from "../types/movimentacoes.types";
import type { TCategoria } from "../types/categorias.types";
import type { TTipo } from "../types/tipos.types";
import { tiposApi } from "../features/tipos/api";

export default function Dashboard() {
  const [movimentacoes, setMovimentacoes] = useState<TMovimentacao[]>([]);
  const [categorias, setCategorias] = useState<TCategoria[]>([]);
  const [tipos, setTipos] = useState<TTipo[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  const carregarMovimentacoes = async () => {
    try {
      const dadosMov = await movimentacoesApi.getAll();
      setMovimentacoes(dadosMov);
    } catch (err: any) {
      setErro(err.message);
    }
  };

  useEffect(() => {
    Promise.all([
      movimentacoesApi.getAll(),
      categoriasApi.getAll(),
      tiposApi.getAll(),
    ])
      .then(([dadosMov, dadosCat, dadosTip]) => {
        setMovimentacoes(dadosMov);
        setCategorias(dadosCat);
        setTipos(dadosTip);
      })
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  const handleCreateMovimentacao = async (payload: TCreateMovimentacaoPayload) => {
    await movimentacoesApi.create(payload);
    await carregarMovimentacoes();
  };

  const handleUpdateMovimentacao = async (id: number, payload: Partial<TCreateMovimentacaoPayload>) => {
    await movimentacoesApi.update(id, payload);
    await carregarMovimentacoes();
  };

  const handleDeleteMovimentacao = async (id: number) => {
    const confirmar = window.confirm("Deseja realmente remover esta movimentação?");
    if (!confirmar) return;

    try {
      await movimentacoesApi.delete(id);
      await carregarMovimentacoes();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir movimentação");
    }
  };

  if (erro) return <div className="p-6 text-red-500">Erro: {erro}</div>;
  if (carregando)
    return <div className="p-6 text-zinc-500">Carregando painel...</div>;

  return (
    <div className="space-y-8">
      <div className="h-48 bg-zinc-100 rounded-xl border border-dashed flex items-center justify-center text-zinc-400">
        [Área dos Gráficos]
      </div>

      <SecaoMovimentacoes
        movimentacoes={movimentacoes}
        categorias={categorias}
        tipos={tipos}
        onCreate={handleCreateMovimentacao}
        onEditar={handleUpdateMovimentacao}
        onExcluir={handleDeleteMovimentacao}
      />
    </div>
  );
}
