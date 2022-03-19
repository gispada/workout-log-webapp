import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { fromFormattedUomToBaseUnit, toISODate } from '@shared/utils/formatting'
import { PersonalRecord, UnitOfMeasure } from '@state/exercises'

@Component({
  selector: 'exercises-personal-record-entry',
  templateUrl: './personal-record-entry.component.html',
  styleUrls: ['./personal-record-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalRecordEntryComponent {
  @Input() pr!: PersonalRecord
  @Input() unitOfMeasure?: UnitOfMeasure

  @Output() delete = new EventEmitter<string>()
  @Output() edit = new EventEmitter<PersonalRecord>()

  formatDateValue(value: Date) {
    return toISODate(value)
  }

  formatNumberValue(value: number) {
    return this.unitOfMeasure
      ? fromFormattedUomToBaseUnit(value, this.unitOfMeasure)
      : value
  }

  getUomSymbol(uom: UnitOfMeasure) {
    const [, symbol] = uom.split(':')
    return symbol
  }

  onChange(key: 'date' | 'value', value: Date | number) {
    this.edit.emit({
      ...this.pr,
      [key]:
        value instanceof Date
          ? this.formatDateValue(value)
          : this.formatNumberValue(value)
    })
  }
}
