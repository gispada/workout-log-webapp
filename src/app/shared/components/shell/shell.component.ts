import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  @Input() logoUrl?: string
  @Input() logoLinkTitle?: string
}
