import * as React from "react";
import { cn } from "../utils";

const baseStyles =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

const variants = {
  default: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow hover:bg-zinc-800 dark:hover:bg-white",
  lime: "bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm hover:bg-emerald-700 dark:hover:bg-emerald-600",
  red: "bg-red-600 dark:bg-red-500 text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-600",
  amber: "bg-amber-500 text-white shadow-sm hover:bg-amber-600",
  outline:
    "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  outline_red:
    "border border-red-200 dark:border-red-900/50 bg-white dark:bg-zinc-900 shadow-sm hover:bg-red-50 dark:hover:bg-red-950/40 text-red-700 dark:text-red-400",
  ghost: "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100",
};

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
