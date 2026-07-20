import type { TCategoria } from "../../../types/categorias.types";
import type { TCreateCategoriaPayload } from "../api";
import { FormNovaCategoria } from "./FormNovaCategoria";

type ModalNovaCategoriaProps = {
  isOpen: boolean;
  categoriaParaEditar?: TCategoria;
  onClose: () => void;
  onSubmit: (payload: TCreateCategoriaPayload) => Promise<void>;
};

export function ModalNovaCategoria({
  isOpen,
  onClose,
  categoriaParaEditar,
  onSubmit,
}: ModalNovaCategoriaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-zinc-900 mb-4">
          {categoriaParaEditar ? "Editar Categoria" : "Adicionar Categoria"}
        </h3>

        <FormNovaCategoria
          categoriaParaEditar={categoriaParaEditar}
          onSubmit={onSubmit}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
