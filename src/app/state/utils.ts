import { Action } from '@ngrx/store'

type LoadingMeta = { loading: boolean; key: string }

type ActionMeta = LoadingMeta

type ActionData<P> = P extends undefined
  ? { meta: ActionMeta }
  : { payload: P; meta: ActionMeta } | { payload: P }

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