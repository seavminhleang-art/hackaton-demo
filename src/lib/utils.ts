import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function requireDemoAccount() {
  if (typeof window === "undefined") return false;
  if (window.localStorage.getItem("found-cambodia-demo-user")) return true;

  const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.assign(`/login?next=${encodeURIComponent(returnTo)}`);
  return false;
}
