import { AbstractControl } from '@angular/forms'
import { Dictionary } from '../types'

const COLORS = ['#2267DC', '#7265e3', '#2bc8d8', '#d1b24f'] // temp: take these colors from scss file

export const isFiniteNumber = (x: unknown): x is Number => Number.isFinite(x)

export const first = <T>(list: T[]): T | undefined => list[0]

export const identity = <T>(x: T) => x

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

export const keyBy = <T extends Dictionary<any>>(
  list: T[],
  key: keyof T
): Dictionary<T> => list.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {})

export const toBooleanDictionary = (list: (string | number)[]): Dictionary<boolean> =>
  list.reduce((acc, item) => ({ ...acc, [item]: true }), {})

export const getThemeColor = (i: number) => COLORS[i % COLORS.length]

export const prop =
  <T, K extends keyof T>(propName: K) =>
  (object: T) =>
    object[propName]

export const displayInvalidFormControls = (controls: Dictionary<AbstractControl>) => {
  for (const control of Object.values(controls)) {
    if (control.invalid) {
      control.markAsDirty()
      control.updateValueAndValidity({ onlySelf: true })
    }
  }
}
