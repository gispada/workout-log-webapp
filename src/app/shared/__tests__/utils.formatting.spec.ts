import { UnitOfMeasure } from '@state/exercises'
import {
  fromBaseUnitToFormattedUom,
  fromFormattedUomToBaseUnit
} from '../utils/formatting'

describe('@shared/utils/formatting', () => {
  describe("Test 'fromBaseUnitToFormattedUom'", () => {
    it('Formats base unit to kilograms', () => {
      expect(fromBaseUnitToFormattedUom(1, UnitOfMeasure.KG)).toEqual(1)
    })

    it('Formats base unit to pounds', () => {
      expect(fromBaseUnitToFormattedUom(100, UnitOfMeasure.LBS)).toEqual(
        220.46244201837774
      )
    })

    it('Formats base unit to seconds', () => {
      expect(fromBaseUnitToFormattedUom(1, UnitOfMeasure.SS)).toEqual(1)
    })

    it('Formats base unit to minutes', () => {
      expect(fromBaseUnitToFormattedUom(60, UnitOfMeasure.MM)).toEqual(1)
    })

    it('Formats base unit to hours', () => {
      expect(fromBaseUnitToFormattedUom(3600, UnitOfMeasure.HH)).toEqual(1)
    })
  })

  describe("Test 'fromFormattedUomToBaseUnit'", () => {
    it('Converts kilograms to base unit', () => {
      expect(fromFormattedUomToBaseUnit(1, UnitOfMeasure.KG)).toEqual(1)
    })

    it('Converts pounds to base unit', () => {
      expect(fromFormattedUomToBaseUnit(220.46, UnitOfMeasure.LBS)).toEqual(99.99889232)
    })

    it('Converts seconds to base unit', () => {
      expect(fromFormattedUomToBaseUnit(1, UnitOfMeasure.SS)).toEqual(1)
    })

    it('Converts minutes to base unit', () => {
      expect(fromFormattedUomToBaseUnit(1, UnitOfMeasure.MM)).toEqual(60)
    })

    it('Converts hours to base unit', () => {
      expect(fromFormattedUomToBaseUnit(1, UnitOfMeasure.HH)).toEqual(3600)
    })
  })
})
