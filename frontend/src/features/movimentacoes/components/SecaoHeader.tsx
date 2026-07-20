import { useState, useEffect } from "react";
import type { TMovimentacao } from "../../../types/movimentacoes.types";
import { formatarMoeda } from "../../../shared/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Scale,
  DollarSign,
} from "lucide-react";

type SecaoHeaderProps = {
  movimentacoes: TMovimentacao[];
  saldoAnterior: number;
  onFilterChange: (filtros: { dataInicio: string; dataFim: string }) => void;
};

export function SecaoHeader({
  movimentacoes,
  saldoAnterior,
  onFilterChange,
}: SecaoHeaderProps) {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = String(hoje.getMonth() + 1).padStart(2, "0");

  const [mesAno, setMesAno] = useState(`${anoAtual}-${mesAtual}`);

  useEffect(() => {
    if (!mesAno) return;
    const [anoStr, mesStr] = mesAno.split("-");
    const ano = Number(anoStr);
    const mes = Number(mesStr);

    if (isNaN(ano) || isNaN(mes)) return;

    const ultimoDia = new Date(ano, mes, 0).getDate();
    const dataInicio = `${anoStr}-${mesStr}-01`;
    const dataFim = `${anoStr}-${mesStr}-${String(ultimoDia).padStart(2, "0")}`;

    onFilterChange({ dataInicio, dataFim });
  }, [mesAno]);

  const handleMesAnterior = () => {
    const [anoStr, mesStr] = mesAno.split("-");
    let ano = Number(anoStr);
    let mes = Number(mesStr) - 1;
    if (mes < 1) {
      mes = 12;
      ano -= 1;
    }
    setMesAno(`${ano}-${String(mes).padStart(2, "0")}`);
  };

  const handleProximoMes = () => {
    const [anoStr, mesStr] = mesAno.split("-");
    let ano = Number(anoStr);
    let mes = Number(mesStr) + 1;
    if (mes > 12) {
      mes = 1;
      ano += 1;
    }
    setMesAno(`${ano}-${String(mes).padStart(2, "0")}`);
  };

  const entradas = movimentacoes
    .filter((m) => m.tipo?.descricao === "Entrada" || m.idTipo === 1)
    .reduce((acc, m) => acc + Number(m.valor), 0);

  const saidas = movimentacoes
    .filter((m) => m.tipo?.descricao === "Saída" || m.idTipo === 2)
    .reduce((acc, m) => acc + Number(m.valor), 0);

  const saldoPeriodo = entradas - saidas;
  const saldoFinal = saldoAnterior + saldoPeriodo;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-6">
      {/* Topo do Header: Seletor de Data / Mês */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Resumo Financeiro
          </h1>
          <p className="text-xs text-zinc-500">
            Filtre por período para visualizar os saldos e movimentações.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-50 p-1.5 rounded-lg border border-zinc-200">
          <button
            type="button"
            onClick={handleMesAnterior}
            className="p-1.5 rounded-md hover:bg-white text-zinc-600 hover:text-zinc-900 transition-colors"
            title="Mês anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-2">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <input
              type="month"
              value={mesAno}
              onChange={(e) => setMesAno(e.target.value)}
              className="bg-transparent text-sm font-semibold text-zinc-800 focus:outline-none cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={handleProximoMes}
            className="p-1.5 rounded-md hover:bg-white text-zinc-600 hover:text-zinc-900 transition-colors"
            title="Próximo mês"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid com os 5 Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Saldo Anterior */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Saldo Anterior</span>
            <Wallet className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-lg font-bold text-zinc-800">
            {formatarMoeda(saldoAnterior)}
          </p>
        </div>

        {/* 2. Entradas */}
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
            <span>Entradas</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-bold text-emerald-700">
            {formatarMoeda(entradas)}
          </p>
        </div>

        {/* 3. Saídas */}
        <div className="rounded-lg border border-red-100 bg-red-50/40 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-red-700">
            <span>Saídas</span>
            <ArrowDownLeft className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-lg font-bold text-red-700">
            {formatarMoeda(saidas)}
          </p>
        </div>

        {/* 4. Saldo Período */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Saldo Período</span>
            <Scale className="w-4 h-4 text-zinc-400" />
          </div>
          <p
            className={`text-lg font-bold ${
              saldoPeriodo >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {formatarMoeda(saldoPeriodo)}
          </p>
        </div>

        {/* 5. Saldo Final */}
        <div className="rounded-lg border border-zinc-900 bg-zinc-900 p-4 space-y-2 text-white">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
            <span>Saldo Final</span>
            <DollarSign className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-lg font-bold text-white">
            {formatarMoeda(saldoFinal)}
          </p>
        </div>
      </div>
    </div>
  );
}
