import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  const maxLength = 11;
  const limited = cleaned.slice(0, maxLength);

  if (limited.length <= 2) {
    return `${limited}`;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 2)} ${limited.slice(2)}`;
  } else {
    return `${limited.slice(0, 2)} ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
}

export function formatarData(dataStr: string) {
  if (!dataStr) return "-";
  const dateOnly = dataStr.split("T")[0];
  const [ano, mes, dia] = dateOnly.split("-");
  if (!ano || !mes || !dia) return dataStr;
  return `${dia}/${mes}/${ano}`;
}

export function formatarMoeda(valor: number): string {
  return (valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const CORES_GRAFICO = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#84cc16", // Lime
  "#3b82f6", // Blue
  "#14b8a6", // Teal
];
