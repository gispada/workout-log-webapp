import { Action } from '@ngrx/store'
import { LoadingKey } from './app/app.model'
import { ActionMeta, ActionData, LoadingMeta, LoadingMetaCreator } from './types'

/**
 * Creates an action's body with the following data:
 * a `payload` of the generic type provided,
 * a `meta` object of a predefined type, or both.
 */
export function withActionData(meta: ActionMeta): () => { meta: ActionMeta }

export function withActionData<P>(
  meta: ActionMeta
): (props: P) => { payload: P; meta: ActionMeta }

export function withActionData<P>(): (props: P) => { payload: P }

export function withActionData<P>(meta?: ActionMeta) {
  return (props?: P) => <ActionData<P>>{ payload: props, meta }
}

export const isActionWithLoading = (
  x: Action & { meta?: ActionMeta }
): x is Action & { meta: LoadingMeta } => typeof x.meta?.loading === 'boolean'

/**
 * Given an array of loading keys, returns an array of functions
 * that can be called with `true` or `false` to set the loading status for each key.
 */
export const loadingMetaFactory = (keys: LoadingKey[]) =>
  keys.reduce<LoadingMetaCreator[]>(
    (acc, key) => [...acc, (value: boolean) => ({ loading: value, key })],
    []
  )
