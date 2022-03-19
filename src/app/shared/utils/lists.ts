/**
 * Given a list, adds one or more items at the end of it.
 */
export const addToList = <T>(list: T[] | undefined, item: T | T[]) =>
  (list || []).concat(item)

/**
 * Given a list of type T, removes one or more of its items.
 * If `toRemove` is an item of type T, that item will be removed;
 * if it's a key-value pair, items for which `item[key] = value` is true will be removed.
 */
export function removeFromList<T, K extends keyof T>(list: T[], toRemove: [K, T[K]]): T[]
export function removeFromList<T>(list: T[], toRemove: T): T[]

export function removeFromList<T, K extends keyof T>(list: T[], toRemove: [K, T[K]] | T) {
  if (Array.isArray(toRemove)) {
    const [key, value] = toRemove
    return list.filter((item) => item[key] !== value)
  }
  return list.filter((item) => item !== toRemove)
}

/**
 * Given a list, switches one or more of its items with a new one.
 * If `toChange` is a number, the item at that index will be changed;
 * if it's an item's key, items for which `item[key] = newItem[key]` is true will be changed.
 */
export function changeListItem<T, K extends keyof T>(
  list: T[],
  newItem: T,
  toChange: K
): T[]
export function changeListItem<T>(list: T[], newItem: T, toChange: number): T[]

export function changeListItem<T, K extends keyof T>(
  list: T[],
  newItem: T,
  toChange: K | number
) {
  if (typeof toChange === 'number') {
    return list.map((item, i) => (i === toChange ? newItem : item))
  }
  return list.map((item) => (item[toChange] === newItem[toChange] ? newItem : item))
}

/**
 * Given a list, adds the specified item if not there, otherwise removes it.
 * If `key` is provided, the search for the item will be done checking the value of that key.
 */
export function toggleListItem<T, K extends keyof T>(list: T[], item: T, key: K): T[]
export function toggleListItem<T>(list: T[], item: T): T[]

export function toggleListItem<T, K extends keyof T>(list: T[], item: T, key?: K) {
  if (key) {
    const value = item[key]
    const included = !!list.find((listItem) => listItem[key] === value)
    return included ? removeFromList(list, [key, value]) : addToList(list, item)
  }
  const included = list.includes(item)
  return included ? removeFromList(list, item) : addToList(list, item)
}
