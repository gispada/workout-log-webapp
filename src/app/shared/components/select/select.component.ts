import { Component, EventEmitter, Input, Output } from '@angular/core'
import { isFiniteNumber } from '@shared/utils/miscellaneous'
import { Nullable } from '@shared/types'

type Option<T> = { label: string; value: T }

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T extends string> {
  @Input() options!: Option<T>[]
  @Input() value!: Option<T>['value']
  @Input() width: string | number = 'auto'
  @Input() placeholder: Nullable<string> = null
  @Input() size: 'small' | 'default' | 'large' = 'large'
  @Input() hideArrow = false
  @Input() disabled?: boolean

  @Output() valueChange = new EventEmitter<typeof this.value>()

  getWidth() {
    return isFiniteNumber(this.width) ? `${this.width}rem` : this.width
  }
}
