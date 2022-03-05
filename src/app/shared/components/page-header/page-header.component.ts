import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() pageTitle!: string
  @Input() pageSubtitle?: string
  @Input() rightTemplate?: TemplateRef<null>
  @Input() goBackTo?: string
}
