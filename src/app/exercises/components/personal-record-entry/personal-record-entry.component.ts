import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { toISODate } from '@shared/utils'
import { PersonalRecord } from '@state/exercises'

type Change = { key: 'date'; value: Date } | { key: 'value'; value: number }

@Component({
  selector: 'exercises-personal-record-entry',
  templateUrl: './personal-record-entry.component.html',
  styleUrls: ['./personal-record-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalRecordEntryComponent {
  @Input() pr!: PersonalRecord

  @Output() delete = new EventEmitter<string>()
  @Output() edit = new EventEmitter<PersonalRecord>()

  onChange({ key, value }: Change) {
    this.edit.emit({
      ...this.pr,
      [key]: value instanceof Date ? toISODate(value) : value
    })
  }
}
