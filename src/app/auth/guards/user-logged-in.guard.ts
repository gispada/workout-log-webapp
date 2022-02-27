import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { userSelectors } from '@state/user'
import { SIGNIN } from '@config/routes'

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {
  isLoggedIn$ = this.store.select(userSelectors.selectIsLoggedIn)

  constructor(private store: Store, private router: Router) {}

  canActivate() {
    return this.isLoggedIn$.pipe(
      map((isLogged) => isLogged || this.router.parseUrl(`/${SIGNIN}`))
    )
  }
}
