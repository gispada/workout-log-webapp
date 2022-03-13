import {
  addToList,
  hexToRgba,
  keyBy,
  removeFromList,
  changeListItem,
  toggleListItem
} from '../utils'

describe('@shared/utils', () => {
  describe("Test 'hexToRgba'", () => {
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

  describe("Test 'keyBy'", () => {
    it('Transforms a list into an object using the specified key', () => {
      const list = [
        { id: '1', name: 'Item 1', color: 'red' },
        { id: '2', name: 'Item 2', color: 'green' },
        { id: '3', name: 'Item 3', color: 'blue' }
      ]
      const expected = {
        '1': { id: '1', name: 'Item 1', color: 'red' },
        '2': { id: '2', name: 'Item 2', color: 'green' },
        '3': { id: '3', name: 'Item 3', color: 'blue' }
      }
      expect(keyBy(list, 'id')).toEqual(expected)
    })
  })

  describe("Test 'addToList'", () => {
    it('Adds an item to an existing list', () => {
      const list = [{ name: 'John' }]
      const expected = [{ name: 'John' }, { name: 'Mary' }]
      expect(addToList(list, { name: 'Mary' })).toEqual(expected)
    })

    it('Adds an item to an undefined list', () => {
      const expected = [{ name: 'Mary' }]
      expect(addToList(undefined, { name: 'Mary' })).toEqual(expected)
    })
  })

  describe("Test 'removeFromList'", () => {
    it('Removes an item from the list, by value', () => {
      const list = ['John', 'Mary', 'William']
      const expected = ['Mary', 'William']
      expect(removeFromList(list, 'John')).toEqual(expected)
    })

    it('Removes an item from the list, using a key-value pair', () => {
      const list = [
        { id: '22', name: 'John' },
        { id: '44', name: 'Mary' },
        { id: '88', name: 'William' }
      ]
      const expected = [
        { id: '44', name: 'Mary' },
        { id: '88', name: 'William' }
      ]
      expect(removeFromList(list, ['id', '22'])).toEqual(expected)
    })
  })

  describe("Test 'changeListItem'", () => {
    it('Changes an item in the list, by index', () => {
      type Item = { name: string; new?: boolean }

      const list: Item[] = [{ name: 'John' }, { name: 'Mary' }, { name: 'William' }]
      const expected: Item[] = [
        { name: 'John' },
        { name: 'Mary', new: true },
        { name: 'William' }
      ]
      expect(changeListItem(list, { name: 'Mary', new: true }, 1)).toEqual(expected)
    })

    it('Changes an item in the list, by key', () => {
      type Item = { id: string; name: string; new?: boolean }

      const list: Item[] = [
        { id: '1', name: 'John' },
        { id: '2', name: 'Mary' },
        { id: '3', name: 'William' }
      ]
      const expected: Item[] = [
        { id: '1', name: 'John' },
        { id: '2', name: 'Mary', new: true },
        { id: '3', name: 'William' }
      ]
      expect(changeListItem(list, { id: '2', name: 'Mary', new: true }, 'id')).toEqual(
        expected
      )
    })
  })

  describe("Test 'toggleListItem'", () => {
    it('Toggles the right item, by value', () => {
      const list = ['John', 'Mary', 'William']
      const result1 = toggleListItem(list, 'Jane')

      const expected1 = ['John', 'Mary', 'William', 'Jane']
      const expected2 = ['John', 'William', 'Jane']

      expect(result1).toEqual(expected1)
      expect(toggleListItem(result1, 'Mary')).toEqual(expected2)
    })

    it('Toggles the right item, by key', () => {
      const list = [
        { id: '1', name: 'John' },
        { id: '2', name: 'Mary' },
        { id: '3', name: 'William' }
      ]
      const result1 = toggleListItem(list, { id: '4', name: 'Jane' }, 'id')

      const expected1 = [
        { id: '1', name: 'John' },
        { id: '2', name: 'Mary' },
        { id: '3', name: 'William' },
        { id: '4', name: 'Jane' }
      ]
      const expected2 = [
        { id: '1', name: 'John' },
        { id: '3', name: 'William' },
        { id: '4', name: 'Jane' }
      ]

      expect(result1).toEqual(expected1)
      expect(toggleListItem(result1, { id: '2', name: 'Mary' }, 'id')).toEqual(expected2)
    })
  })
})
