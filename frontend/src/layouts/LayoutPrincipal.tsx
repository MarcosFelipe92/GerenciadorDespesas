import * as React from "react";
import { Navbar } from "../shared/components/Navbar";

export function LayoutPrincipal({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50">
      {/* Navbar Lateral Esquerda */}
      <Navbar />

      {/* Conteúdo da Página à Direita */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
