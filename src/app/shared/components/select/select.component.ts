import { Component, EventEmitter, Input, Output } from '@angular/core'

type Option = { label: string; value: string }

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options!: Option[]
  @Input() width: string | number = 'auto'
  @Input() value?: Option['value']
  @Input() disabled?: boolean

  @Output() valueChange = new EventEmitter<Option['value']>()

  getWidth() {
    return Number.isFinite(this.width) ? `${this.width}rem` : this.width
  }
}
