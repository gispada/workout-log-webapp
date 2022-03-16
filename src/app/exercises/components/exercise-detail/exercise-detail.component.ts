import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import type { NgForm } from '@angular/forms'
import { EXERCISES } from '@config/routes'
import { exercisesActions, exercisesSelectors } from '@state/exercises'
import { displayInvalidFormControls } from '@shared/utils'

const { exerciseNew, exerciseTagRemoved, exerciseTagsAdded, exercisePropertyChanged } =
  exercisesActions

@Component({
  selector: 'exercises-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailComponent implements OnInit {
  parentUrl = EXERCISES
  exerciseId = this.route.snapshot.paramMap.get('id')
  modalVisible = false

  draft$ = this.store.select(exercisesSelectors.selectDraft)

  constructor(
    public translate: TranslateModule,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    if (!this.exerciseId) {
      this.store.dispatch(exerciseNew())
    }
  }

  onChange(id: string, event: string) {
    this.store.dispatch(exercisePropertyChanged({ [id]: event }))
  }

  addTags(ids: string[]) {
    this.store.dispatch(exerciseTagsAdded(ids))
  }

  deleteTag(id: string) {
    this.store.dispatch(exerciseTagRemoved(id))
  }

  saveDraft(form: NgForm) {
    if (!form.valid) {
      return displayInvalidFormControls(form.controls)
    }

    console.log('SAVE')
  }
}
