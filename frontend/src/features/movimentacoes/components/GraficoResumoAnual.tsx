import type { TResumoMensal } from "../api";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatarMoeda } from "../../../shared/utils";

type GraficoResumoAnualProps = {
  resumoAnual: TResumoMensal[];
  mesSelecionado: number;
  anoSelecionado: number;
};

const NOMES_CURTOS_MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const NOMES_EXTENSOS_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function GraficoResumoAnual({
  resumoAnual,
  mesSelecionado,
  anoSelecionado,
}: GraficoResumoAnualProps) {
  const chartData = resumoAnual.map((item) => ({
    ...item,
    nomeMes: NOMES_CURTOS_MESES[item.mes - 1] || `${item.mes}`,
  }));

  const somaSaldoAnual = resumoAnual.reduce((acc, item) => acc + item.saldo, 0);
  const mediaMensalAnual =
    resumoAnual.length > 0 ? somaSaldoAnual / resumoAnual.length : 0;

  const itemMesSelecionado = resumoAnual.find(
    (item) => item.mes === mesSelecionado,
  ) || {
    mes: mesSelecionado,
    entradas: 0,
    saidas: 0,
    saldo: 0,
  };

  const saldoMesAtual = itemMesSelecionado.saldo;
  const diferencaComMedia = saldoMesAtual - mediaMensalAnual;
  const percentualVariacao =
    mediaMensalAnual !== 0
      ? (diferencaComMedia / Math.abs(mediaMensalAnual)) * 100
      : 0;

  const nomeMesExtenso =
    NOMES_EXTENSOS_MESES[mesSelecionado - 1] || `Mês ${mesSelecionado}`;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: TResumoMensal = payload[0].payload;
      return (
        <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-lg text-xs space-y-1.5 z-50 relative opacity-100">
          <p className="font-bold text-zinc-900">
            {NOMES_EXTENSOS_MESES[item.mes - 1]} / {anoSelecionado}
          </p>
          <div className="flex items-center justify-between gap-4 text-emerald-600 font-medium">
            <span>Entradas:</span>
            <span>{formatarMoeda(item.entradas)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-red-600 font-medium">
            <span>Saídas:</span>
            <span>{formatarMoeda(item.saidas)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-zinc-900 font-bold pt-1 border-t border-zinc-100">
            <span>Saldo Período:</span>
            <span
              className={item.saldo >= 0 ? "text-emerald-600" : "text-red-600"}
            >
              {formatarMoeda(item.saldo)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
        <div>
          <h3 className="text-base font-bold text-zinc-900 tracking-tight">
            Saldo Período Mês a Mês ({anoSelecionado})
          </h3>
          <p className="text-xs text-zinc-500">
            Comparativo anual com destaque para o mês selecionado
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <BarChart3 className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
        {/* Gráfico de Barras dos 12 meses */}
        <div className="lg:col-span-8 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f4f4f5"
              />
              <XAxis
                dataKey="nomeMes"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#71717a" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#71717a" }}
                tickFormatter={(val) =>
                  Math.abs(val) >= 1000
                    ? `R$ ${(val / 1000).toFixed(0)}k`
                    : `R$ ${val}`
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 100, outline: "none" }}
              />
              <Bar dataKey="saldo" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => {
                  const isSelecionado = entry.mes === mesSelecionado;
                  return (
                    <Cell
                      key={`bar-${entry.mes}`}
                      fill={isSelecionado ? "#10b981" : "#e4e4e7"}
                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Card Lateral de Comparação e Estatísticas */}
        <div className="lg:col-span-4 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 space-y-4 flex flex-col justify-center h-full">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Análise Anual de Caixa
            </span>
            <h4 className="text-sm font-bold text-zinc-800">
              Desempenho de {nomeMesExtenso}
            </h4>
          </div>

          <div className="space-y-3 divide-y divide-zinc-200/60">
            {/* Média Mensal Anual */}
            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-zinc-600 font-medium">
                Média Anual do Saldo:
              </span>
              <span className="font-bold text-zinc-900">
                {formatarMoeda(mediaMensalAnual)}
              </span>
            </div>

            {/* Saldo do Mês Selecionado */}
            <div className="pt-3 flex items-center justify-between text-xs">
              <span className="text-zinc-600 font-medium">
                Saldo de {nomeMesExtenso}:
              </span>
              <span
                className={`font-bold ${
                  saldoMesAtual >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {formatarMoeda(saldoMesAtual)}
              </span>
            </div>

            {/* Variação em relação à média */}
            <div className="pt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">
                  Variação vs. Média:
                </span>
                <span className="font-bold text-zinc-900">
                  {formatarMoeda(diferencaComMedia)}
                </span>
              </div>

              <div className="flex items-center justify-end">
                {diferencaComMedia > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    <TrendingUp className="w-3 h-3" />
                    +{percentualVariacao.toFixed(1)}% acima da média
                  </span>
                ) : diferencaComMedia < 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">
                    <TrendingDown className="w-3 h-3" />
                    {percentualVariacao.toFixed(1)}% abaixo da média
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2 py-0.5 text-[11px] font-bold text-zinc-700">
                    <Minus className="w-3 h-3" />
                    Na média anual
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
