import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Message } from '../types'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private translate: TranslateService, private ngMessage: NzMessageService) {}

  displayMessage(message: Message) {
    const {
      i18nText,
      type = 'info',
      duration = 3000,
      animate = true,
      pauseOnHover = false
    } = message

    this.translate.get(`Messages.${i18nText}`).subscribe((text: string) => {
      this.ngMessage[type](text, {
        nzDuration: duration,
        nzPauseOnHover: pauseOnHover,
        nzAnimate: animate
      })
    })
  }

  displayNotification() {
    // TO DO
  }
}
