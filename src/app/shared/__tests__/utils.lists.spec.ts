import { addToList, removeFromList, changeListItem, toggleListItem } from '../utils/lists'

describe('@shared/utils/lists', () => {
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

    it('Adds multiple items to an existing list', () => {
      const list = [{ name: 'John' }]
      const expected = [{ name: 'John' }, { name: 'Mary' }, { name: 'Jane' }]
      expect(addToList(list, [{ name: 'Mary' }, { name: 'Jane' }])).toEqual(expected)
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
