import { Component, Inject } from '@angular/core'
import { AppConfig, APP_CONFIG } from '@config/app'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-language-switcher',
  template: `<app-select
    [options]="languages"
    [value]="translate.currentLang"
    (valueChange)="translate.use($event)"
    size="default"
    [hideArrow]="true"
    [width]="4.6"
  ></app-select>`,
  styles: ['::ng-deep .ant-select-selection-item { text-align: center }']
})
export class LanguageSwitcherComponent {
  languages = this.appConfig.languages.map(({ key, short }) => ({
    label: short,
    value: key
  }))

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public translate: TranslateService
  ) {}
}
