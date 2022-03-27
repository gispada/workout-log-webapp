import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs'
import { Dictionary } from '@shared/types'
import { EXERCISE_NEW } from '@config/routes'
import { prop } from '@shared/utils/miscellaneous'
import { appSelectors } from '@state/app'
import { exercisesActions, exercisesSelectors } from '@state/exercises'

@Component({
  selector: 'exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent implements OnInit {
  newExerciseUrl = EXERCISE_NEW

  private columnDefs = [
    { dataKey: 'name', i18nTitle: 'Exercises.Name' },
    { dataKey: 'description', width: '40%', i18nTitle: 'Exercises.Description' },
    { dataKey: 'tags', i18nTitle: 'Exercises.Tags' }
  ]

  exercises$ = this.store.select(exercisesSelectors.selectExercises)
  selected$ = this.store.select(exercisesSelectors.selectSelectedExercises)
  fetchLoading$ = this.store.select(appSelectors.selectLoadingStatus('exercises.fetch'))
  deleteLoading$ = this.store.select(appSelectors.selectLoadingStatus('exercises.delete'))

  translatedColumnDefs$ = this.translate
    .stream(this.columnDefs.map(prop('i18nTitle')))
    .pipe(
      map((translations: Dictionary<string>) =>
        this.columnDefs.map(({ i18nTitle, ...rest }) => ({
          ...rest,
          title: translations[i18nTitle]
        }))
      )
    )

  constructor(private store: Store, private translate: TranslateService) {}

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
