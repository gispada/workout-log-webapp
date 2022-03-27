import { createAction } from '@ngrx/store'
import { withActionData, loadingMetaFactory } from '@state/utils'
import { Exercise, PersonalRecord } from './exercises.model'

export type ExerciseSimpleProps = Partial<
  Pick<Exercise, 'name' | 'description' | 'unitOfMeasure'>
>

const [fetchLoading, saveLoading, deleteLoading] = loadingMetaFactory([
  'exercises.fetch',
  'exercises.save',
  'exercises.delete'
])

// -------------------- Fetching -------------------- //

export const exercisesDataInit = createAction('[Exercises] Initialize exercises data')

export const exercisesFetch = createAction(
  '[Exercises] Fetch all exercises',
  withActionData(fetchLoading(true))
)

export const exerciseFetch = createAction(
  '[Exercises] Fetch single exercise',
  withActionData<{ id: string }>(fetchLoading(true))
)

export const exercisesFetchSuccess = createAction(
  '[Exercises API] Fetch all exercises success',
  withActionData<Exercise[]>(fetchLoading(false))
)

// -------------------- Editing -------------------- //

export const exerciseNew = createAction('[Exercises page] Add new exercise')

export const exerciseEditing = createAction(
  '[Exercises page] Edit existing exercise',
  withActionData<{ id: string }>()
)

export const exercisePropertyChanged = createAction(
  '[Exercises page] Exercise property changed',
  withActionData<ExerciseSimpleProps>()
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

// -------------------- Saving -------------------- //

export const newExerciseSave = createAction(
  '[Exercises page] Save new exercise draft',
  withActionData(saveLoading(true))
)

export const existingExerciseSave = createAction(
  '[Exercises page] Save existing exercise draft',
  withActionData(saveLoading(true))
)

export const newExerciseSaveSuccess = createAction(
  '[Exercises API] New exercise draft save success',
  withActionData<Exercise>(saveLoading(false))
)

export const existingExerciseSaveSuccess = createAction(
  '[Exercises API] Existing exercise draft save success',
  withActionData<Exercise>(saveLoading(false))
)

// -------------------- Deleting -------------------- //

export const exerciseDelete = createAction(
  '[Exercises page] Delete single exercise',
  withActionData<string>(deleteLoading(true))
)

export const selectedExercisesDelete = createAction(
  '[Exercises page] Delete selected exercises',
  withActionData(deleteLoading(true))
)

export const exerciseDeleteSuccess = createAction(
  '[Exercises API] Exercise delete success',
  withActionData<string>(deleteLoading(false))
)

export const selectedExercisesDeleteSuccess = createAction(
  '[Exercises API] Selected exercises delete success',
  withActionData(deleteLoading(false))
)

// -------------------- Other -------------------- //

export const exerciseDraftCleared = createAction(
  '[Exercises page] Exercise draft cleared'
)

export const exerciseToDraft = createAction(
  '[Exercises page] Copy exercise to draft',
  withActionData<Exercise>(saveLoading(false))
)

export const exercisesSelectionChanged = createAction(
  '[Exercises page] Exercises selection changed',
  withActionData<string[]>()
)

export const exercisesError = createAction(
  '[Exercises API] Exercises error',
  withActionData<string>(fetchLoading(false))
)
