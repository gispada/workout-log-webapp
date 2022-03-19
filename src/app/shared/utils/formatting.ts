import { formatISO } from 'date-fns'
import { UnitOfMeasure } from '@state/exercises'

const { KG, LBS, SS, MM, HH } = UnitOfMeasure

const LBS_KG_RATIO = 0.453592

const skipFormatting = (x: number) => x

const toUomFormattersMap = {
  [KG]: skipFormatting,
  [SS]: skipFormatting,
  [LBS]: (x: number) => x / LBS_KG_RATIO,
  [MM]: (x: number) => x / 60,
  [HH]: (x: number) => x / 60 / 60
}

const toBaseUnitFormattersMap = {
  [KG]: skipFormatting,
  [SS]: skipFormatting,
  [LBS]: (x: number) => x * LBS_KG_RATIO,
  [MM]: (x: number) => x * 60,
  [HH]: (x: number) => x * 60 * 60
}

export const toISODate = (date: Date) => formatISO(date)

export const roundToTwo = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100

export const fromBaseUnitToFormattedUom = (
  value: number,
  unitOfMeasure: UnitOfMeasure
) => {
  const formatter = toUomFormattersMap[unitOfMeasure]
  return formatter ? formatter(value) : value
}

export const fromFormattedUomToBaseUnit = (
  value: number,
  unitOfMeasure: UnitOfMeasure
) => {
  const formatter = toBaseUnitFormattersMap[unitOfMeasure]
  return formatter ? formatter(value) : value
}
