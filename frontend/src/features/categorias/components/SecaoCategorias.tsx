import { useState } from "react";
import { TabelaCategorias } from "./TabelaCategorias";
import { ModalNovaCategoria } from "./ModalNovaCategoria";
import { Button } from "../../../shared/components/Button";
import { Plus } from "lucide-react";
import type { TCategoria } from "../../../types/categorias.types";
import type { TCreateCategoriaPayload } from "../api";

type SecaoCategoriasProps = {
  categorias: TCategoria[];
  onCreate: (payload: TCreateCategoriaPayload) => Promise<void>;
  onEditar: (
    id: number,
    payload: Partial<TCreateCategoriaPayload>,
  ) => Promise<void>;
  onExcluir: (id: number) => Promise<void>;
};

export function SecaoCategorias({
  categorias,
  onCreate,
  onEditar,
  onExcluir,
}: SecaoCategoriasProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaParaEditar, setCategoriaParaEditar] = useState<
    TCategoria | undefined
  >(undefined);

  const handleOpenNewModal = () => {
    setCategoriaParaEditar(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: TCategoria) => {
    setCategoriaParaEditar(cat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoriaParaEditar(undefined);
  };

  const handleSubmit = async (payload: TCreateCategoriaPayload) => {
    if (categoriaParaEditar) {
      await onEditar(categoriaParaEditar.id, payload);
    } else {
      await onCreate(payload);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Categorias
          </h2>
          <p className="text-xs text-zinc-500">
            Gerenciamento de categorias do sistema.
          </p>
        </div>

        <Button
          variant="lime"
          className="gap-2 text-xs h-9 font-semibold shadow-sm"
          onClick={handleOpenNewModal}
        >
          <Plus className="w-4 h-4" />
          Nova Categoria
        </Button>
      </div>

      <TabelaCategorias
        categorias={categorias}
        onEditar={handleOpenEditModal}
        onExcluir={onExcluir}
      />

      <ModalNovaCategoria
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        categoriaParaEditar={categoriaParaEditar}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
