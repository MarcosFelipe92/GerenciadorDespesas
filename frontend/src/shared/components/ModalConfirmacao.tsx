import type { ReactNode } from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";
import { AlertTriangle } from "lucide-react";

export type ModalConfirmacaoProps = {
  isOpen: boolean;
  titulo?: string;
  mensagem: ReactNode;
  textoConfirmar?: string;
  textoCancelar?: string;
  variantConfirmar?: ButtonProps["variant"];
  carregando?: boolean;
  onConfirmar: () => void | Promise<void>;
  onCancelar: () => void;
};

export function ModalConfirmacao({
  isOpen,
  titulo = "Atenção!",
  mensagem,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  variantConfirmar = "red",
  carregando = false,
  onConfirmar,
  onCancelar,
}: ModalConfirmacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">{titulo}</h3>
        </div>

        <div className="text-sm text-zinc-600 leading-relaxed">{mensagem}</div>

        <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            onClick={onCancelar}
            disabled={carregando}
          >
            {textoCancelar}
          </Button>
          <Button
            type="button"
            variant={variantConfirmar}
            onClick={onConfirmar}
            disabled={carregando}
          >
            {carregando ? "Processando..." : textoConfirmar}
          </Button>
        </div>
      </div>
    </div>
  );
}
