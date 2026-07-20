import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function BotaoTema() {
  const { theme, setTheme, isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
        title="Alternar Tema"
        aria-label="Alternar Tema"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-emerald-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 w-36 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-lg z-50 text-xs space-y-0.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              theme === "light"
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Claro</span>
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              theme === "dark"
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escuro</span>
          </button>

          <button
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              theme === "system"
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-blue-500" />
            <span>Sistema</span>
          </button>
        </div>
      )}
    </div>
  );
}
