import { createReducer, on } from '@ngrx/store'
import { assert } from '@shared/utils'
import {
  exerciseNew,
  exercisesFetchSuccess,
  exerciseBaseDraftChange,
  exercisePrAdded,
  exercisePrRemoved,
  exercisePrEdited
} from './exercises.actions'
import { ExercisesState } from './exercises.model'

const UNITIALIZED_DRAFT = 'Trying to edit an exercise draft that was not initialized'

const initialState: Readonly<ExercisesState> = { exercises: [] }

export const exercisesReducer = createReducer(
  initialState,
  on(exercisesFetchSuccess, (state, { payload }) => ({ ...state, exercises: payload })),
  on(exerciseNew, (state) => ({
    ...state,
    draft: { id: 'new_exercise', name: '', description: '' }
  })),
  on(exerciseBaseDraftChange, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: { ...state.draft, ...payload }
    }
  }),
  on(exercisePrAdded, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: {
        ...state.draft,
        personalRecords: [...(state.draft.personalRecords || []), payload]
      }
    }
  }),
  on(exercisePrRemoved, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: {
        ...state.draft,
        personalRecords: state.draft.personalRecords?.filter(({ id }) => id !== payload)
      }
    }
  }),
  on(exercisePrEdited, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: {
        ...state.draft,
        personalRecords: state.draft.personalRecords?.map((pr) =>
          pr.id === payload.id ? payload : pr
        )
      }
    }
  })
)
