import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, exhaustMap, map, of, switchMap, tap, mapTo, filter } from 'rxjs'
import { ExercisesApiService, FeedbackService } from '@core/services'
import { EXERCISES } from '@config/routes'
import { assert } from '@shared/utils/miscellaneous'
import {
  newExerciseSave,
  exercisesFetch,
  exercisesFetchSuccess,
  exerciseEditing,
  exerciseFetch,
  exerciseToDraft,
  exercisesError,
  exerciseDelete,
  exerciseDeleteSuccess,
  exercisesDataInit,
  newExerciseSaveSuccess,
  existingExerciseSave,
  existingExerciseSaveSuccess,
  selectedExercisesDelete,
  selectedExercisesDeleteSuccess
} from './exercises.actions'
import {
  selectDraftForSaving,
  selectExerciseById,
  selectExercises,
  selectSelectedExercises
} from './exercise.selectors'

@Injectable()
export class ExercisesEffects {
  initExercisesData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exercisesDataInit),
      concatLatestFrom(() => this.store.select(selectExercises)),
      filter(([, maybeExercises]) => !maybeExercises),
      mapTo(exercisesFetch()) // Only fetch if exercises are null
    )
  })

  fetchAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exercisesFetch),
      switchMap(() =>
        this.exercisesApi.getAll().pipe(
          map(exercisesFetchSuccess),
          catchError(() => of(exercisesError('ExercisesFetchFailed')))
        )
      )
    )
  })

  editExistingExercise$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exerciseEditing),
      concatLatestFrom(({ payload }) =>
        this.store.select(selectExerciseById(payload.id))
      ),
      map(([{ payload }, maybeExercise]) =>
        maybeExercise ? exerciseToDraft(maybeExercise) : exerciseFetch({ id: payload.id })
      )
    )
  })

  fetchExerciseForEditing$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exerciseFetch),
      switchMap(({ payload }) => this.exercisesApi.getById(payload.id)),
      catchError(() => of(null)),
      map((maybeExercise) =>
        maybeExercise
          ? exerciseToDraft(maybeExercise)
          : exercisesError('ExerciseNotFound')
      )
    )
  })

  saveNewExerciseDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newExerciseSave),
      concatLatestFrom(() => this.store.select(selectDraftForSaving)),
      exhaustMap(([, draft]) => this.exercisesApi.create(draft)),
      map(newExerciseSaveSuccess)
    )
  })

  saveExistingExerciseDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(existingExerciseSave),
      concatLatestFrom(() => this.store.select(selectDraftForSaving)),
      exhaustMap(([, draft]) => {
        assert('_id' in draft, 'Can not save an existing exercise without ID')
        return this.exercisesApi.update(draft._id, draft)
      }),
      map((exercise) => existingExerciseSaveSuccess(exercise!)) // It should not be possible to save an exercise that does not exist
    )
  })

  deleteSingleExercise$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exerciseDelete),
      exhaustMap(({ payload }) => this.exercisesApi.delete(payload).pipe(mapTo(payload))),
      map(exerciseDeleteSuccess),
      tap(() => this.router.navigateByUrl(`/${EXERCISES}`))
    )
  })

  deleteSelectedExercises$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(selectedExercisesDelete),
      concatLatestFrom(() => this.store.select(selectSelectedExercises)),
      exhaustMap(([, selected]) => this.exercisesApi.delete(selected)),
      mapTo(selectedExercisesDeleteSuccess())
    )
  })

  refreshExercises$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        exerciseDeleteSuccess,
        selectedExercisesDeleteSuccess,
        existingExerciseSaveSuccess
      ),
      mapTo(exercisesFetch())
    )
  })

  // -------------------- Non-dispatching effects -------------------- //

  onNewExerciseSave$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(newExerciseSaveSuccess),
        tap(({ payload }) =>
          this.router.navigateByUrl(`/${EXERCISES}/${payload._id}`, { replaceUrl: true })
        )
      )
    },
    { dispatch: false }
  )

  showSaveSuccessMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(newExerciseSaveSuccess, existingExerciseSaveSuccess),
        tap(() =>
          this.feedback.displayMessage({ i18nText: 'ExerciseSaved', type: 'success' })
        )
      )
    },
    { dispatch: false }
  )

  displayError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(exercisesError),
        tap(({ payload }) => {
          this.feedback.displayMessage({ i18nText: payload, type: 'error' })
        })
      )
    },
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private store: Store,
    private exercisesApi: ExercisesApiService,
    private feedback: FeedbackService,
    private router: Router
  ) {}
}
