import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-form-item-block',
  templateUrl: './form-item-block.component.html',
  styleUrls: ['./form-item-block.component.scss']
})
export class FormItemBlockComponent {
  @Input() label!: string
}
