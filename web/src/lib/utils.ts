import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ABORT_SAFE } from "@/lib/constant.ts"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmtDate(str: string) {
  return new Date(str).toLocaleString()
}

export function fmtFrom(str: string) {
  const match = str.match(/^(.+?)\s*<(.+?)>$/)
  return match ? match[1] : str
}

function randomStr(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function randomAddress(domain: string) {
  return `${randomStr(8)}@${domain}`
}

export function fetchError(e: any) {
  if (e === ABORT_SAFE || e.name === "AbortError") {
    return
  }
  toast.error(e.message ?? e)
}

export function fmtString(template: string, ...values: any[]) {
  return template.replace(/{(\d+)}/g, (match, index) => values[index] ?? match)
}
