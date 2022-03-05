import { createReducer, on } from '@ngrx/store'
import { exercisesFetchSuccess } from './exercises.actions'
import { ExercisesState } from './exercises.model'

const initialState: Readonly<ExercisesState> = { exercises: [] }

export const exercisesReducer = createReducer(
  initialState,
  on(exercisesFetchSuccess, (state, { payload }) => ({ ...state, exercises: payload }))
)
