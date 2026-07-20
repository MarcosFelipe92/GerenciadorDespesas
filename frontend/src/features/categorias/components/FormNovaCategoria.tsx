import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import type { TCategoria } from "../../../types/categorias.types";
import type { TCreateCategoriaPayload } from "../api";

type FormData = {
  descricao: string;
};

type FormNovaCategoriaProps = {
  onSuccess: () => void;
  onCancel: () => void;
  onSubmit: (payload: TCreateCategoriaPayload) => Promise<void>;
  categoriaParaEditar?: TCategoria;
};

export function FormNovaCategoria({
  onSuccess,
  onCancel,
  onSubmit: onSubmitProp,
  categoriaParaEditar,
}: FormNovaCategoriaProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      descricao: categoriaParaEditar ? categoriaParaEditar.descricao : "",
    },
  });

  useEffect(() => {
    if (categoriaParaEditar) {
      reset({
        descricao: categoriaParaEditar.descricao,
      });
    } else {
      reset({
        descricao: "",
      });
    }
  }, [categoriaParaEditar, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload: TCreateCategoriaPayload = {
        descricao: data.descricao.trim(),
      };

      await onSubmitProp(payload);
      reset();
      onSuccess();
    } catch (err: any) {
      alert(err.message || "Erro ao salvar categoria");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Descrição"
        placeholder="Ex: Alimentação, Transporte..."
        error={errors.descricao?.message}
        {...register("descricao", {
          required: "A descrição é obrigatória",
          validate: (val) =>
            val.trim() !== "" || "A descrição não pode conter apenas espaços",
        })}
      />

      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="lime">
          Salvar
        </Button>
      </div>
    </form>
  );
}
