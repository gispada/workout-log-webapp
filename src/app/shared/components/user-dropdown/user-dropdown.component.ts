import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { userActions } from '@state/user'

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  constructor(public translate: TranslateService, private store: Store) {}

  onLogout() {
    this.store.dispatch(userActions.logout())
  }
}
