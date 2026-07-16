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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-zinc-900 mb-4">
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
