import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { UserEditableProp } from '@state/types'

@Pipe({ name: 'translateEditableProp', pure: false })
export class TranslateEditablePropPipe implements PipeTransform, OnDestroy {
  private translatePipe: TranslatePipe

  constructor(translate: TranslateService, cdr: ChangeDetectorRef) {
    this.translatePipe = new TranslatePipe(translate, cdr)
  }

  transform(prop: UserEditableProp) {
    if ('value' in prop) return prop.value
    return this.translatePipe.transform(prop.i18nValue) as string
  }

  ngOnDestroy() {
    this.translatePipe.ngOnDestroy()
  }
}
