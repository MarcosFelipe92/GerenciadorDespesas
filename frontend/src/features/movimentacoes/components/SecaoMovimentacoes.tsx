import { useState } from "react";
import { TabelaMovimentacoes } from "./TabelaMovimentacoes";
import { ModalNovaMovimentacao } from "./ModalNovaMovimentacao";
import { ModalConfirmacao } from "../../../shared/components/ModalConfirmacao";
import { Button } from "../../../shared/components/Button";
import { Plus } from "lucide-react";
import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TCategoria } from "../../../types/categorias.types";
import type { TTipo } from "../../../types/tipos.types";
import type { TCreateMovimentacaoPayload } from "../api";

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Movimentações
          </h2>
          <p className="text-xs text-zinc-500">
            Histórico detalhado de entradas e saídas do caixa.
          </p>
        </div>

        <Button
          variant="lime"
          className="gap-2 text-xs h-9 font-semibold shadow-sm"
          onClick={handleOpenNewModal}
        >
          <Plus className="w-4 h-4" />
          Nova Movimentação
        </Button>
      </div>

      <TabelaMovimentacoes
        movimentacoes={movimentacoes}
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
