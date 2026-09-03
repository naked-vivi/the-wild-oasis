import { formatDistance, parseISO, differenceInDays } from "date-fns"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const subtractDates = (dateStr1: Date | string, dateStr2: Date | string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)))

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In")

export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date()

  if (options?.end) today.setUTCHours(23, 59, 59, 999)
  else today.setUTCHours(0, 0, 0, 0)

  return today.toISOString()
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  )
