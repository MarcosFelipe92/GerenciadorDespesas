import { useState } from "react";
import { TabelaMovimentacoes } from "./TabelaMovimentacoes";
import { ModalNovaMovimentacao } from "./ModalNovaMovimentacao";
import { ModalConfirmacao } from "../../../shared/components/ModalConfirmacao";
import { Button } from "../../../shared/components/Button";
import { Plus, Search, X } from "lucide-react";
import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TCategoria } from "../../../types/categorias.types";
import type { TTipo } from "../../../types/tipos.types";
import type { TCreateMovimentacaoPayload } from "../api";
import { normalizarTexto } from "../../../shared/utils";

type SecaoMovimentacoesProps = {
  movimentacoes: TMovimentacao[];
  categorias: TCategoria[];
  tipos: TTipo[];
  onCreate: (payload: TCreateMovimentacaoPayload) => Promise<void>;
  onEditar: (
    id: number,
    payload: Partial<TCreateMovimentacaoPayload>,
  ) => Promise<void>;
  onExcluir: (id: number) => Promise<void>;
};

export function SecaoMovimentacoes({
  categorias,
  movimentacoes,
  tipos,
  onCreate,
  onEditar,
  onExcluir,
}: SecaoMovimentacoesProps) {
  const [termoBusca, setTermoBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movimentacaoParaEditar, setMovimentacaoParaEditar] = useState<
    TMovimentacao | undefined
  >(undefined);
  const [movimentacaoParaExcluir, setMovimentacaoParaExcluir] =
    useState<TMovimentacao | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const handleOpenNewModal = () => {
    setMovimentacaoParaEditar(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (mov: TMovimentacao) => {
    setMovimentacaoParaEditar(mov);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMovimentacaoParaEditar(undefined);
  };

  const handleOpenExcluirModal = (id: number) => {
    const mov = movimentacoes.find((m) => m.id === id);
    if (mov) {
      setMovimentacaoParaExcluir(mov);
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!movimentacaoParaExcluir) return;
    try {
      setExcluindo(true);
      await onExcluir(movimentacaoParaExcluir.id);
      setMovimentacaoParaExcluir(null);
    } finally {
      setExcluindo(false);
    }
  };

  const handleSubmit = async (payload: TCreateMovimentacaoPayload) => {
    if (movimentacaoParaEditar) {
      await onEditar(movimentacaoParaEditar.id, payload);
    } else {
      await onCreate(payload);
    }
  };

  const movimentacoesFiltradas = movimentacoes.filter((mov) => {
    if (!termoBusca.trim()) return true;
    const buscaNorm = normalizarTexto(termoBusca);
    const descNorm = normalizarTexto(mov.descricao || "");
    const catNorm = normalizarTexto(mov.categoria?.descricao || "");
    return descNorm.includes(buscaNorm) || catNorm.includes(buscaNorm);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Movimentações
          </h2>
          <p className="text-xs text-zinc-500">
            Histórico detalhado de entradas e saídas do caixa.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Campo de Busca estilo LIKE no Front */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Buscar por descrição..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
            />
            {termoBusca && (
              <button
                type="button"
                onClick={() => setTermoBusca("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <Button
            variant="lime"
            className="gap-2 text-xs h-9 font-semibold shadow-sm shrink-0"
            onClick={handleOpenNewModal}
          >
            <Plus className="w-4 h-4" />
            Nova Movimentação
          </Button>
        </div>
      </div>

      <TabelaMovimentacoes
        movimentacoes={movimentacoesFiltradas}
        onEditar={handleOpenEditModal}
        onExcluir={handleOpenExcluirModal}
      />

      <ModalNovaMovimentacao
        categorias={categorias}
        tipos={tipos}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movimentacaoParaEditar={movimentacaoParaEditar}
        onSubmit={handleSubmit}
      />

      <ModalConfirmacao
        isOpen={!!movimentacaoParaExcluir}
        titulo="Excluir Movimentação"
        mensagem={
          <span>
            Tem certeza que deseja remover a movimentação{" "}
            <strong className="text-zinc-900 font-semibold">
              {movimentacaoParaExcluir?.descricao}
            </strong>
            ? Esta ação não poderá ser desfeita.
          </span>
        }
        textoConfirmar="Remover"
        textoCancelar="Cancelar"
        variantConfirmar="red"
        carregando={excluindo}
        onConfirmar={handleConfirmarExclusao}
        onCancelar={() => setMovimentacaoParaExcluir(null)}
      />
    </div>
  );
}
