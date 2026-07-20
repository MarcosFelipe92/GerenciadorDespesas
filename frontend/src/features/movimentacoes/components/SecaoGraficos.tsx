import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TMovimentacaoFiltros } from "../api";
import { GraficoEvolucaoMensal } from "./GraficoEvolucaoMensal";
import { GraficoCategorias } from "./GraficoCategorias";

type SecaoGraficosProps = {
  movimentacoes: TMovimentacao[];
  filtros?: TMovimentacaoFiltros | null;
};

export function SecaoGraficos({
  movimentacoes,
  filtros,
}: SecaoGraficosProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-7">
        <GraficoEvolucaoMensal
          movimentacoes={movimentacoes}
          filtros={filtros}
        />
      </div>
      <div className="lg:col-span-5">
        <GraficoCategorias movimentacoes={movimentacoes} />
      </div>
    </div>
  );
}
