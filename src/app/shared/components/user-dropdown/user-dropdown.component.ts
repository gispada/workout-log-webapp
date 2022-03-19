import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { userActions, userSelectors } from '@state/user'

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  userInitials$ = this.store.select(userSelectors.selectInitials)

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(userActions.logout())
  }
}
