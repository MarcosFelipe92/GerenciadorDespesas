import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TMovimentacaoFiltros } from "../api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { formatarMoeda } from "../../../shared/utils";

type GraficoEvolucaoMensalProps = {
  movimentacoes: TMovimentacao[];
  filtros?: TMovimentacaoFiltros | null;
};

export function GraficoEvolucaoMensal({
  movimentacoes,
  filtros,
}: GraficoEvolucaoMensalProps) {
  let ano = new Date().getFullYear();
  let mes = new Date().getMonth() + 1;

  if (filtros?.dataInicio) {
    const [a, m] = filtros.dataInicio.split("-").map(Number);
    if (!isNaN(a) && !isNaN(m)) {
      ano = a;
      mes = m;
    }
  }

  const quantidadeDias = new Date(ano, mes, 0).getDate();

  const diasMap: Record<
    string,
    { dia: string; entradas: number; saidas: number; dataFormatada: string }
  > = {};

  for (let i = 1; i <= quantidadeDias; i++) {
    const diaStr = String(i).padStart(2, "0");
    const mesStr = String(mes).padStart(2, "0");
    diasMap[diaStr] = {
      dia: diaStr,
      entradas: 0,
      saidas: 0,
      dataFormatada: `${diaStr}/${mesStr}/${ano}`,
    };
  }

  movimentacoes.forEach((mov) => {
    if (!mov.data) return;
    const dateOnly = mov.data.split("T")[0];
    const [aStr, mStr, dStr] = dateOnly.split("-");

    if (Number(aStr) === ano && Number(mStr) === mes && diasMap[dStr]) {
      const isEntrada = mov.tipo?.descricao === "Entrada" || mov.idTipo === 1;
      const valor = Number(mov.valor) || 0;

      if (isEntrada) {
        diasMap[dStr].entradas += valor;
      } else {
        diasMap[dStr].saidas += valor;
      }
    }
  });

  const chartData = Object.values(diasMap);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-md text-xs space-y-1.5">
          <p className="font-bold text-zinc-900">Dia {dataItem.dataFormatada}</p>
          <div className="flex items-center justify-between gap-4 text-emerald-600 font-medium">
            <span>Entradas:</span>
            <span>{formatarMoeda(dataItem.entradas)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-red-600 font-medium">
            <span>Saídas:</span>
            <span>{formatarMoeda(dataItem.saidas)}</span>
          </div>
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
            Evolução Diária (Fluxo de Caixa)
          </h3>
          <p className="text-xs text-zinc-500">
            Comparativo entre entradas e saídas ao longo do mês
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradientEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientSaidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f4f4f5"
            />
            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#71717a" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#71717a" }}
              tickFormatter={(val) =>
                val >= 1000 ? `R$ ${(val / 1000).toFixed(0)}k` : `R$ ${val}`
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 100, outline: "none" }}
            />
            <Area
              type="monotone"
              dataKey="entradas"
              name="Entradas"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#gradientEntradas)"
            />
            <Area
              type="monotone"
              dataKey="saidas"
              name="Saídas"
              stroke="#ef4444"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#gradientSaidas)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 text-xs border-t border-zinc-100 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="font-medium text-zinc-700">Entradas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="font-medium text-zinc-700">Saídas</span>
        </div>
      </div>
    </div>
  );
}
