import { useState } from "react";
import { TabelaCategorias } from "./TabelaCategorias";
import { ModalNovaCategoria } from "./ModalNovaCategoria";
import { ModalConfirmacao } from "../../../shared/components/ModalConfirmacao";
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
  const [categoriaParaExcluir, setCategoriaParaExcluir] =
    useState<TCategoria | null>(null);
  const [excluindo, setExcluindo] = useState(false);

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

  const handleOpenExcluirModal = (id: number) => {
    const cat = categorias.find((c) => c.id === id);
    if (cat) {
      setCategoriaParaExcluir(cat);
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!categoriaParaExcluir) return;
    try {
      setExcluindo(true);
      await onExcluir(categoriaParaExcluir.id);
      setCategoriaParaExcluir(null);
    } finally {
      setExcluindo(false);
    }
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
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Categorias
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
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
        onExcluir={handleOpenExcluirModal}
      />

      <ModalNovaCategoria
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        categoriaParaEditar={categoriaParaEditar}
        onSubmit={handleSubmit}
      />

      <ModalConfirmacao
        isOpen={!!categoriaParaExcluir}
        titulo="Excluir Categoria"
        mensagem={
          <span>
            Tem certeza que deseja remover a categoria{" "}
            <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
              {categoriaParaExcluir?.descricao}
            </strong>
            ? Esta ação não poderá ser desfeita.
          </span>
        }
        textoConfirmar="Remover"
        textoCancelar="Cancelar"
        variantConfirmar="red"
        carregando={excluindo}
        onConfirmar={handleConfirmarExclusao}
        onCancelar={() => setCategoriaParaExcluir(null)}
      />
    </div>
  );
}
