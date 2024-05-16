import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//en-US en-ZA fi-FI fr-FR hu-HU ru-RU pl-PL sk-SK no-NO
export const formatter = new Intl.NumberFormat("no-NO", {
  style: "currency",
  currency: "USD",
});

export function slugFromString(str: string) {
  return str
    .replace(/[^a-z\-A-Z0-9-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .join("-")
    .toLowerCase();
}

export function userRole(str: string) {
  switch (str) {
    case "AFFILIATE":
      return "Афіліат";
    case "BRAND":
      return "Бренд";
    case "MANAGER":
      return "Менеджер";
    default:
      return "Error";
  }
}

export const DEFAULT_MEDIA_CHANNEL_IMAGE =
  "https://res.cloudinary.com/dqwdfhxgl/image/upload/v1715202692/contacts/pev2vhl2tdnfobk6nd74.png";
