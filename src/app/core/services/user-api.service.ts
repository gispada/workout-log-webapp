import { Injectable } from '@angular/core'
import { from } from 'rxjs'
import { Credentials, EmailConfirmParams } from '../types'
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
}
