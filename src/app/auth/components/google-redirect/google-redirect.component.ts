import { Component, OnInit } from '@angular/core'
import { UserApiService } from '@core/services'

@Component({
  selector: 'auth-google-redirect',
  template: '<auth-container><p>Google authentication</p></auth-container>'
})
export class GoogleRedirectComponent implements OnInit {
  constructor(private userApi: UserApiService) {}

  ngOnInit() {
    this.userApi.handleAuthRedirect()
  }
}
