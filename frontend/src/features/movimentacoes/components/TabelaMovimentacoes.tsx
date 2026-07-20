import type { TMovimentacao } from "../../../types/movimentacoes.types";
import { Button } from "../../../shared/components/Button";
import { formatarData } from "../../../shared/utils";

type TabelaMovimentacoesProps = {
  movimentacoes: TMovimentacao[];
  onEditar: (mov: TMovimentacao) => void;
  onExcluir: (id: number) => void;
};

export function TabelaMovimentacoes({
  movimentacoes,
  onEditar,
  onExcluir,
}: TabelaMovimentacoesProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
      <table className="w-full border-collapse text-left text-sm text-zinc-600 dark:text-zinc-300">
        <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            <th className="px-6 py-4">Descrição / Categoria</th>
            <th className="px-6 py-4">Tipo</th>
            <th className="px-6 py-4">Data</th>
            <th className="px-6 py-4 text-right">Valor</th>
            <th className="px-6 py-4">
              <div className="flex justify-end">
                <span className="w-50 text-center">Ações</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {movimentacoes.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-zinc-400 dark:text-zinc-500">
                Nenhuma movimentação cadastrada.
              </td>
            </tr>
          ) : (
            movimentacoes.map((mov) => {
              const isEntrada = mov.tipo?.descricao === "Entrada";

              return (
                <tr
                  key={mov.id}
                  className="hover:bg-zinc-50/75 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  {/* Coluna: Descrição + Categoria */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {mov.descricao}
                      </span>
                      {mov.categoria && (
                        <span className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                          {mov.categoria.descricao}
                        </span>
                      )}
                    </div>
                  </td>
                  {/* Coluna: Tipo (Badge Estilizado) */}
                  <td className="px-6 py-4 alignment-middle">
                    {mov.tipo && (
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          isEntrada
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 ring-emerald-600/20 dark:ring-emerald-500/30"
                            : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 ring-red-600/20 dark:ring-red-500/30"
                        }`}
                      >
                        {mov.tipo.descricao}
                      </span>
                    )}
                  </td>
                  {/* Coluna: Data */}
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                    {formatarData(mov.data)}
                  </td>
                  {/* Coluna: Valor */}
                  <td
                    className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${
                      isEntrada
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {isEntrada ? "+ " : "- "}
                    {Number(mov.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                        variant="red"
                        className="w-24"
                        onClick={() => onExcluir(mov.id)}
                      >
                        Remover
                      </Button>
                      <Button
                        variant="amber"
                        className="w-24"
                        onClick={() => onEditar(mov)}
                      >
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
