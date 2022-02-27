import { createAction } from '@ngrx/store'
import { withActionData } from '../utils'

export const loadingChanged = createAction(
  '[App] Loading status changed',
  withActionData<{ key: string; value: boolean }>()
)
