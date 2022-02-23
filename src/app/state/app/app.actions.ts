import { createAction } from '@ngrx/store'
import { withPayload } from '@shared/utils'

export const navigate = createAction(
  '[App] Navigate',
  withPayload<string | { to: string }>()
)
