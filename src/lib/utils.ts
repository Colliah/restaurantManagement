import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unitMapping(unit: string) {
  const mapping = {
    g: "Gram",
    kg: "Kilogram",
    l: "Liter",
    ml: "Milliliter",
    pieces: "Pieces",
  };
  return mapping[unit as keyof typeof mapping];
}
