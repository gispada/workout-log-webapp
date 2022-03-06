import { createSelector, createFeatureSelector } from '@ngrx/store'
import { ExercisesState } from './exercises.model'

const selectExercisesState = createFeatureSelector<ExercisesState>('exercises')

export const selectDraft = createSelector(selectExercisesState, (state) => state.draft)

export const selectDraftPersonalRecords = createSelector(
  selectDraft,
  (state) => state?.personalRecords
)
