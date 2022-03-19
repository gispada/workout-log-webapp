import { createSelector, createFeatureSelector } from '@ngrx/store'
import { prop } from '@shared/utils/miscellaneous'
import { ExercisesState } from './exercises.model'

const selectExercisesState = createFeatureSelector<ExercisesState>('exercises')

export const selectDraft = createSelector(selectExercisesState, prop('draft'))

export const selectDraftPersonalRecords = createSelector(
  selectDraft,
  (draft) => draft?.personalRecords
)

export const selectUnitOfMeasure = createSelector(
  selectDraft,
  (draft) => draft?.unitOfMeasure
)
