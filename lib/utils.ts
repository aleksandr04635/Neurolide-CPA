import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//en-US fi-FI   ru-RU
//not good no-NO pl-PL sk-SK hu-HU fr-FR  en-ZA
export const formatter = new Intl.NumberFormat("en-US", {
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

export function domainFromURL(urlS: string) {
  let domain = "";
  try {
    // const url = new URL(urlS);
    //domain = url.hostname;
    const matches = urlS.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
    );
    //console.log("MATCHES", matches);

    if (matches && matches.length > 0) {
      domain = matches[1];
    }
  } catch (error) {}
  return domain;
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
