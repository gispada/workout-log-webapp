import { Component, OnInit } from '@angular/core'
import { UserApiService } from '@core/services'

@Component({
  selector: 'app-confirm-user-container',
  template: '<app-auth-container><p>Google authentication</p></app-auth-container>'
})
export class GoogleRedirectComponent implements OnInit {
  constructor(private userApi: UserApiService) {}

  ngOnInit() {
    this.userApi.handleAuthRedirect()
  }
}
