import { useEffect, useState, useCallback } from "react";
import { SecaoHeader } from "../features/movimentacoes/components/SecaoHeader";
import { SecaoGraficos } from "../features/movimentacoes/components/SecaoGraficos";
import { SecaoMovimentacoes } from "../features/movimentacoes/components/SecaoMovimentacoes";
import { movimentacoesApi } from "../features/movimentacoes/api";
import type {
  TCreateMovimentacaoPayload,
  TMovimentacaoFiltros,
} from "../features/movimentacoes/api";
import { categoriasApi } from "../features/categorias/api";
import type { TMovimentacao } from "../types/movimentacoes.types";
import type { TCategoria } from "../types/categorias.types";
import type { TTipo } from "../types/tipos.types";
import { tiposApi } from "../features/tipos/api";

export default function Dashboard() {
  const [movimentacoes, setMovimentacoes] = useState<TMovimentacao[]>([]);
  const [categorias, setCategorias] = useState<TCategoria[]>([]);
  const [tipos, setTipos] = useState<TTipo[]>([]);
  const [saldoAnterior, setSaldoAnterior] = useState<number>(0);
  const [filtros, setFiltros] = useState<TMovimentacaoFiltros | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([categoriasApi.getAll(), tiposApi.getAll()])
      .then(([dadosCat, dadosTip]) => {
        setCategorias(dadosCat);
        setTipos(dadosTip);
      })
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  const carregarDadosFiltrados = useCallback(
    async (novosFiltros: TMovimentacaoFiltros) => {
      try {
        const [dadosMov, saldo] = await Promise.all([
          movimentacoesApi.getAll(novosFiltros),
          movimentacoesApi.getSaldoAnterior(novosFiltros.dataInicio),
        ]);
        setMovimentacoes(dadosMov);
        setSaldoAnterior(saldo);
      } catch (err: any) {
        setErro(err.message || "Erro ao carregar movimentações");
      }
    },
    [],
  );

  const handleFilterChange = (novosFiltros: TMovimentacaoFiltros) => {
    setFiltros(novosFiltros);
    carregarDadosFiltrados(novosFiltros);
  };

  const recarregarAtual = async () => {
    if (filtros) {
      await carregarDadosFiltrados(filtros);
    }
  };

  const handleCreateMovimentacao = async (
    payload: TCreateMovimentacaoPayload,
  ) => {
    await movimentacoesApi.create(payload);
    await recarregarAtual();
  };

  const handleUpdateMovimentacao = async (
    id: number,
    payload: Partial<TCreateMovimentacaoPayload>,
  ) => {
    await movimentacoesApi.update(id, payload);
    await recarregarAtual();
  };

  const handleDeleteMovimentacao = async (id: number) => {
    try {
      await movimentacoesApi.delete(id);
      await recarregarAtual();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir movimentação");
    }
  };

  if (erro) return <div className="p-6 text-red-500">Erro: {erro}</div>;
  if (carregando)
    return <div className="p-6 text-zinc-500">Carregando painel...</div>;

  return (
    <div className="space-y-8">
      <SecaoHeader
        movimentacoes={movimentacoes}
        saldoAnterior={saldoAnterior}
        onFilterChange={handleFilterChange}
      />

      <SecaoGraficos movimentacoes={movimentacoes} filtros={filtros} />

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
