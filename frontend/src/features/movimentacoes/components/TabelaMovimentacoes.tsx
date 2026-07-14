import type { TMovimentacao } from "../../../types/movimentacoes.types";
import { Button } from "../../../shared/components/Button";

type TabelaMovimentacoesProps = {
  movimentacoes: TMovimentacao[];
};

export function TabelaMovimentacoes({
  movimentacoes,
}: TabelaMovimentacoesProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-6 py-4">Descrição / Categoria</th>
            <th className="px-6 py-4">Tipo</th>
            <th className="px-6 py-4 text-right">Valor</th>
            <th className="px-6 py-4">
              <div className="flex justify-end">
                <span className="w-50 text-center">Ações</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {movimentacoes.map((mov) => {
            const isEntrada = mov.tipo?.descricao === "Entrada";

            return (
              <tr
                key={mov.id}
                className="hover:bg-gray-50/75 transition-colors"
              >
                {/* Coluna: Descrição + Categoria */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {mov.descricao}
                    </span>
                    {mov.categoria && (
                      <span className="mt-0.5 text-xs text-gray-400">
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
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-red-50 text-red-700 ring-red-600/20"
                      }`}
                    >
                      {mov.tipo.descricao}
                    </span>
                  )}
                </td>
                {/* Coluna: Valor */}
                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    isEntrada ? "text-green-600" : "text-red-600"
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
                    <Button variant="red" className="w-24">
                      Remover
                    </Button>
                    <Button variant="amber" className="w-24">
                      Editar
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
