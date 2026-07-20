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
import { useTheme } from "../../../shared/contexts/ThemeContext";

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
  const { isDark } = useTheme();

  const chartData = resumoAnual.map((item) => ({
    ...item,
    nomeMes: NOMES_CURTOS_MESES[item.mes - 1] || `${item.mes}`,
  }));

  // Filtrar apenas meses que possuem movimentações (entradas ou saídas)
  const mesesComAtividade = resumoAnual.filter(
    (item) => item.entradas > 0 || item.saidas > 0,
  );
  const qtdMesesComAtividade = mesesComAtividade.length || 1;

  // 1. Médias Anuais (baseadas nos meses ativos do ano)
  const somaSaldoAnual = mesesComAtividade.reduce(
    (acc, item) => acc + item.saldo,
    0,
  );
  const mediaSaldoAnual = somaSaldoAnual / qtdMesesComAtividade;

  const somaEntradasAnual = mesesComAtividade.reduce(
    (acc, item) => acc + item.entradas,
    0,
  );
  const mediaEntradasAnual = somaEntradasAnual / qtdMesesComAtividade;

  const somaSaidasAnual = mesesComAtividade.reduce(
    (acc, item) => acc + item.saidas,
    0,
  );
  const mediaSaidasAnual = somaSaidasAnual / qtdMesesComAtividade;

  // 2. Mês Selecionado
  const itemMes = resumoAnual.find((item) => item.mes === mesSelecionado) || {
    mes: mesSelecionado,
    entradas: 0,
    saidas: 0,
    saldo: 0,
  };

  const nomeMesExtenso =
    NOMES_EXTENSOS_MESES[mesSelecionado - 1] || `Mês ${mesSelecionado}`;

  // 3. Variações vs Média
  // Saldo
  const difSaldo = itemMes.saldo - mediaSaldoAnual;
  const pctSaldo =
    mediaSaldoAnual !== 0
      ? (difSaldo / Math.abs(mediaSaldoAnual)) * 100
      : 0;

  // Entradas
  const difEntradas = itemMes.entradas - mediaEntradasAnual;
  const pctEntradas =
    mediaEntradasAnual !== 0
      ? (difEntradas / mediaEntradasAnual) * 100
      : 0;

  // Saídas
  const difSaidas = itemMes.saidas - mediaSaidasAnual;
  const pctSaidas =
    mediaSaidasAnual !== 0
      ? (difSaidas / mediaSaidasAnual) * 100
      : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: TResumoMensal = payload[0].payload;
      return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-lg text-xs space-y-1.5 z-50 relative opacity-100">
          <p className="font-bold text-zinc-900 dark:text-zinc-100">
            {NOMES_EXTENSOS_MESES[item.mes - 1]} / {anoSelecionado}
          </p>
          <div className="flex items-center justify-between gap-4 text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Entradas:</span>
            <span>{formatarMoeda(item.entradas)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-red-600 dark:text-red-400 font-medium">
            <span>Saídas:</span>
            <span>{formatarMoeda(item.saidas)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-zinc-900 dark:text-zinc-100 font-bold pt-1 border-t border-zinc-100 dark:border-zinc-800">
            <span>Saldo Período:</span>
            <span
              className={
                item.saldo >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }
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
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-4 transition-colors">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Saldo Período Mês a Mês ({anoSelecionado})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Comparativo anual com destaque para o mês selecionado
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
          <BarChart3 className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
        {/* Gráfico de Barras dos 12 meses */}
        <div className="lg:col-span-7 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={isDark ? "#27272a" : "#f4f4f5"}
              />
              <XAxis
                dataKey="nomeMes"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: isDark ? "#a1a1aa" : "#71717a" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: isDark ? "#a1a1aa" : "#71717a" }}
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
                      fill={
                        isSelecionado
                          ? "#10b981"
                          : isDark
                          ? "#27272a"
                          : "#e4e4e7"
                      }
                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Card Lateral de Comparação e Estatísticas Expandido */}
        <div className="lg:col-span-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50 p-4.5 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Análise Anual de Caixa
            </span>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Desempenho de {nomeMesExtenso}
            </h4>
          </div>

          <div className="space-y-3.5 divide-y divide-zinc-200/80 dark:divide-zinc-800">
            {/* Bloco 1: Saldos */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  Média Mensal do Saldo:
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatarMoeda(mediaSaldoAnual)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300 font-bold">
                  Saldo de {nomeMesExtenso}:
                </span>
                <span
                  className={`font-bold ${
                    itemMes.saldo >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {formatarMoeda(itemMes.saldo)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Variação vs. Média:</span>
                <div className="flex items-center gap-1 font-bold">
                  {difSaldo > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{pctSaldo.toFixed(1)}%
                    </span>
                  ) : difSaldo < 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-red-600 dark:text-red-400">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {pctSaldo.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-zinc-500 dark:text-zinc-400">
                      <Minus className="w-3.5 h-3.5" />
                      0.0%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bloco 2: Entradas */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  Média de Entradas no Ano:
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatarMoeda(mediaEntradasAnual)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  Entradas em {nomeMesExtenso}:
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatarMoeda(itemMes.entradas)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Variação de Entradas:</span>
                <div className="flex items-center gap-1 font-bold">
                  {difEntradas > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{pctEntradas.toFixed(1)}%
                    </span>
                  ) : difEntradas < 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {pctEntradas.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-zinc-500 dark:text-zinc-400">
                      <Minus className="w-3.5 h-3.5" />
                      0.0%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bloco 3: Saídas */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  Média de Saídas no Ano:
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatarMoeda(mediaSaidasAnual)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-red-700 dark:text-red-400 font-bold">
                  Saídas em {nomeMesExtenso}:
                </span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {formatarMoeda(itemMes.saidas)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Variação de Saídas:</span>
                <div className="flex items-center gap-1 font-bold">
                  {difSaidas > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-red-600 dark:text-red-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{pctSaidas.toFixed(1)}%
                    </span>
                  ) : difSaidas < 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {pctSaidas.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-zinc-500 dark:text-zinc-400">
                      <Minus className="w-3.5 h-3.5" />
                      0.0%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
