import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { nanoid } from 'nanoid'
import { toISODate } from '@shared/utils/formatting'
import { PersonalRecord, exercisesActions, exercisesSelectors } from '@state/exercises'

const { exercisePrAdded, exercisePrRemoved, exercisePrEdited } = exercisesActions

@Component({
  selector: 'exercises-personal-records',
  templateUrl: './personal-records.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalRecordsComponent {
  personalRecords$ = this.store.select(exercisesSelectors.selectDraftPersonalRecords)
  unitOfMeasure$ = this.store.select(exercisesSelectors.selectDraftUnitOfMeasure)

  constructor(private store: Store) {}

  prTrackBy(_: number, item: PersonalRecord) {
    return item.id
  }

  deletePr(id: string) {
    this.store.dispatch(exercisePrRemoved(id))
  }

  addPr() {
    this.store.dispatch(
      exercisePrAdded({ id: nanoid(), date: toISODate(new Date()), value: 0 })
    )
  }

  editPr(pr: PersonalRecord) {
    this.store.dispatch(exercisePrEdited(pr))
  }
}
