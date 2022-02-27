import { Injectable } from '@angular/core'
import { from, of } from 'rxjs'
import { Credentials, EmailConfirmParams } from '../types/api'
import { RealmService } from './realm.service'

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private realm: RealmService) {}

  login(credentials: Credentials) {
    return from(this.realm.loginWithEmailAndPassword(credentials))
  }

  logout() {
    return from(Promise.resolve(this.realm.logout()))
  }

  registerUser(credentials: Credentials) {
    return from(this.realm.registerWithEmailAndPassword(credentials))
  }

  confirmUser(params: EmailConfirmParams) {
    return from(this.realm.confirmUser(params))
  }

  getCurrentUser() {
    return of(this.realm.app.currentUser)
  }
}
