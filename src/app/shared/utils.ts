import { formatISO } from 'date-fns'

export const isFiniteNumber = (x: unknown): x is Number => Number.isFinite(x)

export const first = <T>(list: T[]): T | undefined => list[0]

export const hexToRgba = (hex: string, alpha = 1) => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) throw new Error('Invalid hex format')

  const chars = hex.slice(1)

  const channels =
    chars.length === 3 ? chars.split('').map((c) => c.repeat(2)) : chars.match(/../g)

  return channels!.reduce((acc, h) => `${acc}${parseInt(h, 16)}, `, 'rgba(') + `${alpha})`
}

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) throw new Error(msg)
}

export const toISODate = (date: Date) => formatISO(date)

export const keyBy = <T extends Record<string, any>>(
  list: T[],
  key: keyof T
): Record<string, T> => list.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {})
