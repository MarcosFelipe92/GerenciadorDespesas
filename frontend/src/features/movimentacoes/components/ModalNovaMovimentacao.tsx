import type { TCategoria } from "../../../types/categorias.types";
import type { TTipo } from "../../../types/tipos.types";
import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TCreateMovimentacaoPayload } from "../api";
import { FormNovaMovimentacao } from "./FormNovaMovimentacao";

type ModalNovaMovimentacaoProps = {
  categorias: TCategoria[];
  tipos: TTipo[];
  isOpen: boolean;
  movimentacaoParaEditar?: TMovimentacao;
  onClose: () => void;
  onSubmit: (payload: TCreateMovimentacaoPayload) => Promise<void>;
};

export function ModalNovaMovimentacao({
  isOpen,
  onClose,
  categorias,
  tipos,
  movimentacaoParaEditar,
  onSubmit,
}: ModalNovaMovimentacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4 text-zinc-900 dark:text-zinc-100">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {movimentacaoParaEditar ? "Editar Movimentação" : "Adicionar Movimentação"}
        </h3>

        <FormNovaMovimentacao
          categorias={categorias}
          tipos={tipos}
          movimentacaoParaEditar={movimentacaoParaEditar}
          onSubmit={onSubmit}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
