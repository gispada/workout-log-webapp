import { Component, Input } from '@angular/core'
import { SideMenuItem } from '@shared/types'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  @Input() logoUrl?: string
  @Input() logoLinkTitle?: string
  @Input() sideMenu!: SideMenuItem[]
}
