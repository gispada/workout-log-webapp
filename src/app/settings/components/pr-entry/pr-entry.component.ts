import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-pr-entry',
  templateUrl: './pr-entry.component.html',
  styleUrls: ['./pr-entry.component.scss']
})
export class PrEntryComponent {
  @Input() date!: string
  @Input() value!: number
  @Input() unit!: string

  @Output() deleted = new EventEmitter()
}
