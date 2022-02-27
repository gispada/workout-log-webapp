import { Component, Inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { APP_CONFIG, AppConfig } from '@config/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private translate: TranslateService
  ) {
    const { defaultLanguage } = appConfig
    translate.setDefaultLang(defaultLanguage)
    translate.use(defaultLanguage)
  }
}
