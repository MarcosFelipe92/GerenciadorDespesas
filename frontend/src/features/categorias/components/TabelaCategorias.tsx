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
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
      <table className="w-full border-collapse text-left text-sm text-zinc-600 dark:text-zinc-300">
        <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
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
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {categorias.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-zinc-400 dark:text-zinc-500">
                Nenhuma categoria cadastrada.
              </td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-zinc-50/75 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  #{cat.id}
                </td>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
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
