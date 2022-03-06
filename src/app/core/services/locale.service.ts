import { Inject, Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { en_US, it_IT, NzI18nService, NzI18nInterface } from 'ng-zorro-antd/i18n'
import { enUS, it } from 'date-fns/locale'
import { AppConfig, APP_CONFIG } from '@config/app'
import { Dictionary } from '@shared/types'

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private nzLocalesMap: Dictionary<[NzI18nInterface, Locale]> = {
    it: [it_IT, it],
    en: [en_US, enUS]
  }

  languages = this.appConfig.languages.map(({ key, short }) => ({
    label: short,
    value: key
  }))

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private translate: TranslateService,
    private nzI18n: NzI18nService
  ) {}

  get currentLanguage() {
    return this.translate.currentLang
  }

  changeLanguage(lang: string) {
    this.translate.use(lang)
    // NgZorro locale config for date/time picker
    const [locale, dateLocale] = this.nzLocalesMap[lang]
    this.nzI18n.setLocale(locale)
    this.nzI18n.setDateLocale(dateLocale)
  }

  initLanguage() {
    const { defaultLanguage } = this.appConfig
    this.translate.setDefaultLang(defaultLanguage)
    this.changeLanguage(defaultLanguage)
  }
}
