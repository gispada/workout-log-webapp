import { Component, Inject, Input } from '@angular/core'
import { AppConfig, APP_CONFIG } from '@config/app'
import { TranslateService } from '@ngx-translate/core'
import { SideMenuItem } from '@shared/types'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  @Input() sideMenu?: SideMenuItem[]

  constructor(
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    public translate: TranslateService
  ) {}
}
