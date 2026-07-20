import type { TMovimentacao } from "../../../types/movimentacoes.types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { CORES_GRAFICO, formatarMoeda } from "../../../shared/utils";

type GraficoCategoriasProps = {
  movimentacoes: TMovimentacao[];
};

export function GraficoCategorias({ movimentacoes }: GraficoCategoriasProps) {
  const despesas = movimentacoes.filter(
    (m) => m.tipo?.descricao === "Saída" || m.idTipo === 2,
  );

  const agrupado = despesas.reduce<Record<string, number>>((acc, mov) => {
    const nomeCategoria = mov.categoria?.descricao || "Outros";
    acc[nomeCategoria] = (acc[nomeCategoria] || 0) + Number(mov.valor);
    return acc;
  }, {});

  const totalDespesas = Object.values(agrupado).reduce(
    (acc, val) => acc + val,
    0,
  );

  const data = Object.entries(agrupado)
    .map(([name, value]) => ({
      name,
      value,
      percent: totalDespesas > 0 ? (value / totalDespesas) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-lg text-xs space-y-1 relative z-50 opacity-100">
          <p className="font-bold text-zinc-900">{item.name}</p>
          <p className="text-zinc-600">
            Valor:{" "}
            <span className="font-semibold text-zinc-900">
              {formatarMoeda(item.value)}
            </span>
          </p>
          <p className="text-zinc-500">
            Proporção:{" "}
            <span className="font-semibold text-zinc-800">
              {item.percent.toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-900 tracking-tight">
            Despesas por Categoria
          </h3>
          <p className="text-xs text-zinc-500">
            Distribuição proporcional de saídas no período
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <PieChartIcon className="w-4 h-4" />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-center text-xs text-zinc-400">
          Nenhuma despesa registrada neste período.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Donut Chart */}
          <div className="sm:col-span-6 h-56 relative flex items-center justify-center">
            {/* Total no centro da rosca (renderizado antes para o Tooltip ficar por cima) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-0">
              <span className="text-[10px] uppercase font-semibold text-zinc-400">
                Total Saídas
              </span>
              <span className="text-sm font-bold text-zinc-900">
                {formatarMoeda(totalDespesas)}
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        CORES_GRAFICO[index % CORES_GRAFICO.length]
                      }
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 100, outline: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda Interativa e Detalhada */}
          <div className="sm:col-span-6 space-y-2 max-h-56 overflow-y-auto pr-1">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        CORES_GRAFICO[index % CORES_GRAFICO.length],
                    }}
                  />
                  <span className="font-medium text-zinc-800 truncate">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-zinc-400 text-[11px]">
                    {item.percent.toFixed(0)}%
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {formatarMoeda(item.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
