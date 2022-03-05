import { Component } from '@angular/core'
import { LocaleService } from '@core/services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(locale: LocaleService) {
    locale.initLanguage()
  }
}
