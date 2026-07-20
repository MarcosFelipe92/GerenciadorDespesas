import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { Select } from "../../../shared/components/Select";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import type { TCategoria } from "../../../types/categorias.types";
import type { TTipo } from "../../../types/tipos.types";
import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TCreateMovimentacaoPayload } from "../api";

type FormData = {
  descricao: string;
  valor: string;
  idTipo: number;
  idCategoria: string;
  data: string;
};

type FormNovaMovimentacaoProps = {
  onSuccess: () => void;
  onCancel: () => void;
  onSubmit: (payload: TCreateMovimentacaoPayload) => Promise<void>;
  categorias: TCategoria[];
  tipos: TTipo[];
  movimentacaoParaEditar?: TMovimentacao;
};

export function FormNovaMovimentacao({
  onSuccess,
  onCancel,
  onSubmit: onSubmitProp,
  categorias,
  tipos,
  movimentacaoParaEditar,
}: FormNovaMovimentacaoProps) {
  const opcoesCategorias = categorias.map((cat) => ({
    value: String(cat.id),
    label: cat.descricao,
  }));

  const entrada = tipos.find((t) => t.descricao === "Entrada");
  const saida = tipos.find((t) => t.descricao === "Saída");

  const idEntrada = entrada ? Number(entrada.id) : 1;
  const idSaida = saida ? Number(saida.id) : 2;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      idTipo: movimentacaoParaEditar ? movimentacaoParaEditar.idTipo : idSaida,
      descricao: movimentacaoParaEditar ? movimentacaoParaEditar.descricao : "",
      valor: movimentacaoParaEditar
        ? Number(movimentacaoParaEditar.valor).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })
        : "",
      idCategoria: movimentacaoParaEditar ? String(movimentacaoParaEditar.idCategoria) : "",
      data: movimentacaoParaEditar
        ? movimentacaoParaEditar.data.split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    register("idCategoria", { required: "Selecione uma categoria" });
  }, [register]);

  useEffect(() => {
    if (movimentacaoParaEditar) {
      reset({
        idTipo: movimentacaoParaEditar.idTipo,
        descricao: movimentacaoParaEditar.descricao,
        valor: Number(movimentacaoParaEditar.valor).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        }),
        idCategoria: String(movimentacaoParaEditar.idCategoria),
        data: movimentacaoParaEditar.data.split("T")[0],
      });
    } else {
      reset({
        idTipo: idSaida,
        descricao: "",
        valor: "",
        idCategoria: "",
        data: new Date().toISOString().split("T")[0],
      });
    }
  }, [movimentacaoParaEditar, reset, idSaida]);

  const idTipoSelecionado = useWatch({
    control,
    name: "idTipo",
    defaultValue: idSaida,
  });

  const idCategoriaSelecionada = useWatch({
    control,
    name: "idCategoria",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const valorTratado = parseFloat(
        data.valor
          .replace(/R\$\s?/, "")
          .replace(/\./g, "")
          .replace(",", ".")
      );

      const payload = {
        descricao: data.descricao,
        valor: valorTratado,
        idTipo: Number(data.idTipo),
        idCategoria: Number(data.idCategoria),
        data: data.data,
      };

      await onSubmitProp(payload);
      reset();
      onSuccess();
    } catch (err: any) {
      alert(err.message || "Erro ao salvar movimentação");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...register("idTipo", { required: true })} />

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-700 tracking-wide">
          Tipo da Movimentação
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("idTipo", idEntrada)}
            className={`flex items-center justify-center gap-2 h-11 rounded-lg border text-sm font-medium transition-all cursor-pointer ${idTipoSelecionado === idEntrada
              ? "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500 shadow-sm"
              : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <ArrowUpRight
              className={`w-4 h-4 ${idTipoSelecionado === idEntrada ? "text-green-600" : "text-zinc-400"
                }`}
            />
            Receita / Entrada
          </button>

          <button
            type="button"
            onClick={() => setValue("idTipo", idSaida)}
            className={`flex items-center justify-center gap-2 h-11 rounded-lg border text-sm font-medium transition-all cursor-pointer ${idTipoSelecionado === idSaida
              ? "bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500 shadow-sm"
              : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <ArrowDownLeft
              className={`w-4 h-4 ${idTipoSelecionado === idSaida ? "text-red-600" : "text-zinc-400"
                }`}
            />
            Despesa / Saída
          </button>
        </div>
      </div>

      <Input
        label="Descrição"
        placeholder="Ex: Conta de Energia"
        error={errors.descricao?.message}
        {...register("descricao", { required: "A descrição é obrigatória" })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Data"
          type="date"
          error={errors.data?.message}
          {...register("data", { required: "A data é obrigatória" })}
        />

        <Input
          label="Valor"
          type="text"
          placeholder="R$ 0,00"
          error={errors.valor?.message}
          {...register("valor", {
            required: "O valor é obrigatório",
            validate: (value) => {
              const valorLimpo = String(value)
                .replace(/R\$\s?/, "")
                .replace(/\./g, "")
                .replace(",", ".");
              const numero = parseFloat(valorLimpo);
              if (isNaN(numero)) return "Insira um número válido";
              if (numero <= 0) return "O valor deve ser maior que zero";
              return true;
            },
          })}
        />
      </div>

      <Select
        label="Categoria"
        options={opcoesCategorias}
        value={idCategoriaSelecionada || ""}
        error={errors.idCategoria?.message}
        onChange={(val) =>
          setValue("idCategoria", val, { shouldValidate: true })
        }
      />

      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
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