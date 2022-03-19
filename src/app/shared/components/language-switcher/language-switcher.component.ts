import { Component } from '@angular/core'
import { LocaleService } from '@core/services'

@Component({
  selector: 'app-language-switcher',
  template: `<app-select
    [options]="locale.languages"
    [value]="locale.currentLanguage"
    (valueChange)="locale.changeLanguage($event)"
    size="default"
    [hideArrow]="true"
    [width]="4.6"
  ></app-select>`,
  styles: ['app-select ::ng-deep .ant-select-selection-item { text-align: center }']
})
export class LanguageSwitcherComponent {
  constructor(public locale: LocaleService) {}
}
