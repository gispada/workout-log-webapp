import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { userActions, userSelectors } from '@state/user'

@Component({
  selector: 'auth-confirm-user',
  templateUrl: './confirm-user.component.html'
})
export class ConfirmUserComponent implements OnInit {
  confirmationStatus$ = this.store.select(userSelectors.selectConfirmationStatus)

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const { queryParamMap } = this.route.snapshot
    const token = queryParamMap.get('token')
    const tokenId = queryParamMap.get('tokenId')

    if (token && tokenId) {
      this.store.dispatch(userActions.emailConfirmation({ token, tokenId }))
    }
  }
}
