import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardTitle?: string
  @Input() cardSubtitle?: string
  @Input() rightTemplate?: TemplateRef<null>
}
