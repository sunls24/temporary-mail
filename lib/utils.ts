import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomMail() {
  return Math.random().toString(36).substring(3);
}

export function fmtLocaleTime(time: Date): string {
  return time.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hourCycle: "h23",
  });
}

export function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
