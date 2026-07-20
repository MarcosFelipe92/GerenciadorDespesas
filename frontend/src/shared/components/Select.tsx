import { useState, useRef, useEffect } from "react";
import { cn } from "../utils";
import { ChevronDown, Check } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  error,
  placeholder = "Selecione...",
  options,
  value,
  onChange,
  disabled,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-1.5" ref={containerRef}>
      {label && (
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer select-none",
            error && "border-red-500 dark:border-red-500 focus:ring-red-400",
            !selectedOption && "text-zinc-400 dark:text-zinc-500",
            className,
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200",
              isOpen && "transform rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-100">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500 text-center">
                Nenhuma opção encontrada
              </div>
            ) : (
              options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors text-left cursor-pointer select-none",
                      isSelected
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100",
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
