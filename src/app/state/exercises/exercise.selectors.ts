import { createSelector, createFeatureSelector } from '@ngrx/store'
import { prop, assert } from '@shared/utils/miscellaneous'
import { NewEntity } from '@state/types'
import { Exercise, ExercisesState } from './exercises.model'

const selectExercisesState = createFeatureSelector<ExercisesState>('exercises')

export const selectDraft = createSelector(selectExercisesState, prop('draft'))

export const selectDraftForSaving = createSelector(selectDraft, (draft) => {
  assert(draft, 'Draft must be initialized')
  const { staticTitle, ...rest } = draft
  return rest
})

export const selectDraftPersonalRecords = createSelector(
  selectDraft,
  (draft) => draft?.personalRecords
)

export const selectDraftUnitOfMeasure = createSelector(
  selectDraft,
  (draft) => draft?.unitOfMeasure
)

export const selectExercises = createSelector(selectExercisesState, prop('exercises'))

export const selectExerciseById = (id: string) =>
  createSelector(selectExercises, (exercises) => exercises?.find(({ _id }) => _id === id))

export const selectSelectedExercises = createSelector(
  selectExercisesState,
  prop('selected')
)
