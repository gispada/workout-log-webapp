import { createAction } from '@ngrx/store'
import { withActionData } from '@state/utils'
import { Exercise } from './exercises.model'

const loading = (value: boolean) => ({ loading: value, key: 'exercises' })

export const exercisesFetch = createAction(
  '[Exercises] Fetch data',
  withActionData(loading(true))
)

export const exercisesFetchSuccess = createAction(
  '[Exercises API] Fetch data success',
  withActionData<Exercise[]>(loading(false))
)

export const exerciseNew = createAction('[Exercises page] New exercise')

export const exerciseEditing = createAction(
  '[Exercises page] Exercise editing',
  withActionData<{ id: string }>()
)

export const exerciseEditingDone = createAction('[Exercises page] Exercise editing done')
