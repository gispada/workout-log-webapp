import { Component, EventEmitter, Input, Output } from '@angular/core'
import { isFiniteNumber } from '@shared/utils'
import { Nullable } from '@shared/types'

type Option = { label: string; value: string }

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options!: Option[]
  @Input() width: string | number = 'auto'
  @Input() placeholder: Nullable<string> = null
  @Input() value?: Option['value']
  @Input() disabled?: boolean

  @Output() valueChange = new EventEmitter<Option['value']>()

  getWidth() {
    return isFiniteNumber(this.width) ? `${this.width}rem` : this.width
  }
}
