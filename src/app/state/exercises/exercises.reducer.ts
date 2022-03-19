import { createReducer, on } from '@ngrx/store'
import { addToList, changeListItem, removeFromList } from '@shared/utils/lists'
import { assert } from '@shared/utils/miscellaneous'
import {
  exerciseNew,
  exercisesFetchSuccess,
  exercisePropertyChanged,
  exercisePrAdded,
  exercisePrRemoved,
  exercisePrEdited,
  exerciseTagsAdded,
  exerciseTagRemoved
} from './exercises.actions'
import { ExercisesState, UnitOfMeasure } from './exercises.model'

const UNITIALIZED_DRAFT = 'Trying to edit an exercise draft that was not initialized'

const initialState: Readonly<ExercisesState> = { exercises: [] }

export const exercisesReducer = createReducer(
  initialState,
  on(exercisesFetchSuccess, (state, { payload }) => ({ ...state, exercises: payload })),
  on(exerciseNew, (state) => ({
    ...state,
    draft: {
      id: 'new_exercise',
      name: '',
      description: '',
      unitOfMeasure: UnitOfMeasure.KG
    }
  })),
  on(exercisePropertyChanged, (state, { payload }) => {
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
  on(exerciseTagsAdded, (state, { payload }) => {
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
