import { createAction } from '@ngrx/store'
import { withActionData } from '@state/utils'
import { Exercise, PersonalRecord } from './exercises.model'

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

export const exercisePropertyChanged = createAction(
  '[Exercises page] Exercise property changed',
  withActionData<{ name?: string; description?: string }>()
)

export const exerciseTagsAdded = createAction(
  '[Exercises page] Exercise tags added',
  withActionData<string | string[]>()
)

export const exerciseTagRemoved = createAction(
  '[Exercises page] Exercise tag removed',
  withActionData<string>()
)

export const exercisePrAdded = createAction(
  '[Exercises page] Exercise PR added',
  withActionData<PersonalRecord>()
)

export const exercisePrRemoved = createAction(
  '[Exercises page] Exercise PR removed',
  withActionData<string>()
)

export const exercisePrEdited = createAction(
  '[Exercises page] Exercise PR edited',
  withActionData<PersonalRecord>()
)
