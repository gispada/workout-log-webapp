import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { EXERCISE_NEW } from '@config/routes'
import { Store } from '@ngrx/store'
import { TableColumn } from '@shared/types'
import { appSelectors } from '@state/app'
import { exercisesActions, exercisesSelectors } from '@state/exercises'

@Component({
  selector: 'exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent implements OnInit {
  newExerciseUrl = EXERCISE_NEW
  ns = 'Settings.Exercises.'

  exercises$ = this.store.select(exercisesSelectors.selectExercises)
  selected$ = this.store.select(exercisesSelectors.selectSelectedExercises)
  fetchLoading$ = this.store.select(appSelectors.selectLoadingStatus('exercises.fetch'))
  deleteLoading$ = this.store.select(appSelectors.selectLoadingStatus('exercises.delete'))

  //@ViewChild('firstRow') firstRow?: TemplateRef<any>

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(exercisesActions.exercisesDataInit())
  }

  selected(selection: string[]) {
    this.store.dispatch(exercisesActions.exercisesSelectionChanged(selection))
  }

  deleteSelected() {
    this.store.dispatch(exercisesActions.selectedExercisesDelete())
  }
}
