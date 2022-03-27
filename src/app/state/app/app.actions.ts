import { createAction } from '@ngrx/store'
import { withActionData } from '../utils'
import { LoadingKey } from './app.model'

export const loadingChanged = createAction(
  '[App] Loading status changed',
  withActionData<{ key: LoadingKey; value: boolean }>()
)
