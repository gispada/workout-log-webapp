import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import { EXERCISES } from '@config/routes'
import { exercisesActions, exercisesSelectors } from '@state/exercises'

const { exerciseNew, exerciseBaseDraftChange } = exercisesActions

@Component({
  selector: 'exercises-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailComponent implements OnInit {
  parentUrl = EXERCISES
  exerciseId = this.route.snapshot.paramMap.get('id')
  isNew = !this.exerciseId

  draft$ = this.store.select(exercisesSelectors.selectDraft)

  constructor(
    public translate: TranslateModule,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    if (this.isNew) {
      this.store.dispatch(exerciseNew())
    }
  }

  onChange(id: string, value: string) {
    // this.store.dispatch(exerciseBaseDraftChange({ [id]: value }))
  }

  deleteTag(id: string) {
    console.log('remove', id)
  }

  addTag() {
    console.log('add')
  }
}
