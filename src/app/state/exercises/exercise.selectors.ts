import { createSelector, createFeatureSelector } from '@ngrx/store'
import { prop } from '@shared/utils'
import { ExercisesState } from './exercises.model'

const selectExercisesState = createFeatureSelector<ExercisesState>('exercises')

export const selectDraft = createSelector(selectExercisesState, prop('draft'))

export const selectDraftPersonalRecords = createSelector(
  selectDraft,
  (state) => state?.personalRecords
)
