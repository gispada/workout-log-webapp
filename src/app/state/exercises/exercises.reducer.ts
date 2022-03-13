import { createReducer, on } from '@ngrx/store'
import { addToList, assert, changeListItem, removeFromList } from '@shared/utils'
import {
  exerciseNew,
  exercisesFetchSuccess,
  exerciseBaseDraftChange,
  exercisePrAdded,
  exercisePrRemoved,
  exercisePrEdited,
  exerciseTagAdded,
  exerciseTagRemoved
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
        personalRecords: addToList(state.draft.personalRecords, payload)
      }
    }
  }),
  on(exercisePrRemoved, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: {
        ...state.draft,
        personalRecords: removeFromList(state.draft.personalRecords!, ['id', payload])
      }
    }
  }),
  on(exercisePrEdited, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: {
        ...state.draft,
        personalRecords: changeListItem(state.draft.personalRecords!, payload, 'id')
      }
    }
  }),
  on(exerciseTagAdded, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: { ...state.draft, tags: addToList(state.draft.tags, payload) }
    }
  }),
  on(exerciseTagRemoved, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: { ...state.draft, tags: removeFromList(state.draft.tags!, payload) }
    }
  })
)
