export const isFiniteNumber = (x: unknown): x is Number => Number.isFinite(x)

export const first = <T>(list: T[]): T | undefined => list[0]

export const withPayload =
  <T>() =>
  (props: T) => ({ payload: props })
