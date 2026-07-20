import type { TCategoria } from "../../../types/categorias.types";
import { Button } from "../../../shared/components/Button";

type TabelaCategoriasProps = {
  categorias: TCategoria[];
  onEditar: (cat: TCategoria) => void;
  onExcluir: (id: number) => void;
};

export function TabelaCategorias({
  categorias,
  onEditar,
  onExcluir,
}: TabelaCategoriasProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Descrição</th>
            <th className="px-6 py-4">
              <div className="flex justify-end">
                <span className="w-50 text-center">Ações</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {categorias.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                Nenhuma categoria cadastrada.
              </td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-gray-50/75 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-xs text-gray-400">
                  #{cat.id}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {cat.descricao}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      variant="red"
                      className="w-24"
                      onClick={() => onExcluir(cat.id)}
                    >
                      Remover
                    </Button>
                    <Button
                      variant="amber"
                      className="w-24"
                      onClick={() => onEditar(cat)}
                    >
                      Editar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
