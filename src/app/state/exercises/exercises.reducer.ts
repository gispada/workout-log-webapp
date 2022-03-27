import { createReducer, on } from '@ngrx/store'
import { addToList, changeListItem, removeFromList } from '@shared/utils/lists'
import { assert } from '@shared/utils/miscellaneous'
import { logoutSuccess } from '../user/user.actions'
import {
  exerciseNew,
  exercisesFetchSuccess,
  exercisePropertyChanged,
  exercisePrAdded,
  exercisePrRemoved,
  exercisePrEdited,
  exerciseTagsAdded,
  exerciseTagRemoved,
  exerciseDraftCleared,
  exerciseToDraft,
  exerciseDeleteSuccess,
  newExerciseSaveSuccess,
  existingExerciseSaveSuccess,
  exercisesSelectionChanged,
  selectedExercisesDeleteSuccess
} from './exercises.actions'
import { ExercisesState, UnitOfMeasure } from './exercises.model'

const UNITIALIZED_DRAFT = 'Trying to edit an exercise draft that was not initialized'

const initialState: Readonly<ExercisesState> = { exercises: null, selected: [] }

const getInitialExerciseDraft = (): ExercisesState['draft'] => ({
  staticTitle: { i18nValue: 'Exercises.AddNew' },
  name: { value: '' },
  description: { value: '' },
  unitOfMeasure: UnitOfMeasure.KG
})

export const exercisesReducer = createReducer(
  initialState,
  on(exercisesFetchSuccess, (state, { payload }) => ({ ...state, exercises: payload })),
  on(exerciseNew, (state) => ({ ...state, draft: getInitialExerciseDraft() })),
  on(newExerciseSaveSuccess, (state, { payload }) => ({
    ...state,
    exercises: addToList(state.exercises || [], payload)
  })),
  on(exerciseToDraft, existingExerciseSaveSuccess, (state, { payload }) => ({
    ...state,
    draft: { staticTitle: payload.name, ...payload }
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
  }),
  on(exercisesSelectionChanged, (state, { payload }) => ({
    ...state,
    selected: payload
  })),
  on(exerciseDeleteSuccess, (state, { payload }) => ({
    ...state,
    selected: removeFromList(state.selected, payload)
  })),
  on(selectedExercisesDeleteSuccess, (state) => ({ ...state, selected: [] })),
  on(exerciseDraftCleared, (state) => ({ ...state, draft: undefined })),
  on(logoutSuccess, () => initialState)
)
