import { Component } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-settings-tabs',
  templateUrl: './settings-tabs.component.html'
})
export class SettingsTabsComponent {
  constructor(public translate: TranslateModule) {}
}
