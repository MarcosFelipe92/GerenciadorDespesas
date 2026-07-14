import * as React from "react";
import { cn } from "../utils";

const baseStyles =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-zinc-900 text-white shadow hover:bg-zinc-800",
  lime: "bg-lime-500 text-white shadow-sm hover:bg-lime-600",
  red: "bg-red-500 text-white shadow-sm hover:bg-red-700",
  amber: "bg-amber-500 text-white shadow-sm hover:bg-amber-700",
  outline:
    "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 text-zinc-900",
  outline_red:
    "border border-red-200 bg-white shadow-sm hover:bg-red-100 text-red-900",
  ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
};

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
