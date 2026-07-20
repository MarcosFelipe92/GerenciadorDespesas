import { NavLink } from "react-router";
import { BotaoTema } from "./BotaoTema";
import { LayoutDashboard, Tag } from "lucide-react";

export function Navbar() {
  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between transition-colors duration-200">
      <div>
        <div className="text-xl font-bold text-emerald-600 dark:text-emerald-500 mb-8 flex items-center gap-2">
          <span>Green Finanças</span>
        </div>
        <nav className="space-y-1.5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`
            }
          >
            <Tag className="w-4 h-4" />
            <span>Categorias</span>
          </NavLink>
        </nav>
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          v0.0.1
        </span>
        <BotaoTema />
      </div>
    </aside>
  );
}
