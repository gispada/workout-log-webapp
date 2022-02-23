import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { userActions } from '@state/user'

@Component({
  selector: 'app-confirm-user-container',
  templateUrl: './confirm-user.component.html'
})
export class ConfirmUserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const { queryParamMap } = this.route.snapshot
    const token = queryParamMap.get('token')
    const tokenId = queryParamMap.get('tokenId')
    if (token && tokenId) {
      this.store.dispatch(userActions.confirmUser({ token, tokenId }))
    }
  }
}
