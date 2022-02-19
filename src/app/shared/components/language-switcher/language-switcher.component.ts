import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { languages } from '@config/constants'

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
  languages = languages.map(({ key, short }) => ({ label: short, value: key }))

  constructor(public translate: TranslateService) {}
}
