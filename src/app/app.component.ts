import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { defaultLanguage, menuItems } from '@config/constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(defaultLanguage)
    translate.use(defaultLanguage)
  }

  title = 'Workout Log'
  menu = menuItems
}
