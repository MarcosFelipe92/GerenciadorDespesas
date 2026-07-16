import { NavLink } from "react-router";

export function Navbar() {
  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-6 flex flex-col justify-between">
      <div>
        <div className="text-xl font-bold text-emerald-600 mb-8">
          Green Finanças
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium ${isActive ? "text-zinc-900 bg-zinc-100" : "text-zinc-600 hover:bg-zinc-50"
              } rounded-lg transition-colors`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium ${isActive ? "text-zinc-900 bg-zinc-100" : "text-zinc-600 hover:bg-zinc-50"
              } rounded-lg transition-colors`
            }
          >
            Categorias
          </NavLink>
        </nav>
      </div>
      <div className="text-xs text-zinc-400">v0.0.1</div>
    </aside>
  );
}
