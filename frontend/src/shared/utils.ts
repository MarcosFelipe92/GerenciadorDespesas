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
