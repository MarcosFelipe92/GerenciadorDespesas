import { Navbar } from "../shared/components/Navbar";
import { Outlet } from "react-router";

export function LayoutPrincipal() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50">
      {/* Navbar Lateral Esquerda */}
      <Navbar />

      {/* Conteúdo da Página à Direita */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
