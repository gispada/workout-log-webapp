import { hexToRgba } from '../utils'

describe('@shared/utils', () => {
  describe('Test hexToRgba', () => {
    it('Handles invalid hex strings 1', () => {
      expect(() => hexToRgba('f0e3c')).toThrow(new Error('Invalid hex format'))
    })

    it('Handles invalid hex strings 2', () => {
      expect(() => hexToRgba('#44')).toThrow(new Error('Invalid hex format'))
    })

    it('Handles hex strings of length 6 without alpha', () => {
      expect(hexToRgba('#f0e6e6')).toEqual('rgba(240, 230, 230, 1)')
    })

    it('Handles hex strings of length 6 with explicit alpha', () => {
      expect(hexToRgba('#c2e4f8', 0.4)).toEqual('rgba(194, 228, 248, 0.4)')
    })

    it('Handles hex strings of length 3 without alpha', () => {
      expect(hexToRgba('#ccc')).toEqual('rgba(204, 204, 204, 1)')
    })

    it('Handles hex strings of length 3 with explicit alpha', () => {
      expect(hexToRgba('#eee', 0.7)).toEqual('rgba(238, 238, 238, 0.7)')
    })
  })
})
