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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4 text-zinc-900 dark:text-zinc-100">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
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
