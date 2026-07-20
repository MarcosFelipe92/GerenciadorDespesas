import type { TMovimentacao } from "../../../types/movimentacoes.types";
import type { TMovimentacaoFiltros, TResumoMensal } from "../api";
import { GraficoEvolucaoMensal } from "./GraficoEvolucaoMensal";
import { GraficoCategorias } from "./GraficoCategorias";
import { GraficoResumoAnual } from "./GraficoResumoAnual";

type SecaoGraficosProps = {
  movimentacoes: TMovimentacao[];
  filtros?: TMovimentacaoFiltros | null;
  resumoAnual: TResumoMensal[];
  mesSelecionado: number;
  anoSelecionado: number;
};

export function SecaoGraficos({
  movimentacoes,
  filtros,
  resumoAnual,
  mesSelecionado,
  anoSelecionado,
}: SecaoGraficosProps) {
  return (
    <div className="space-y-6">
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

      <GraficoResumoAnual
        resumoAnual={resumoAnual}
        mesSelecionado={mesSelecionado}
        anoSelecionado={anoSelecionado}
      />
    </div>
  );
}
