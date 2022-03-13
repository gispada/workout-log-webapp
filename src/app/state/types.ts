export type LoadingMeta = { loading: boolean; key: string }

export type ActionMeta = LoadingMeta

export type ActionData<P> = P extends undefined
  ? { meta: ActionMeta }
  : { payload: P; meta: ActionMeta } | { payload: P }

/**
 * A translated property that a user can edit:
 * in that case the original translated value is ignored.
 */
export type UserEditableProp = { i18nValue: string } | { value: string }

/**
 * Utility type that converts `UserEditableProp` into `string`,
 * to represent a translated entity.
 */
export type Translated<T> = {
  [K in keyof T]: T[K] extends UserEditableProp ? string : T[K]
}
