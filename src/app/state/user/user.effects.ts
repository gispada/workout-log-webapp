import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, tap } from 'rxjs'
import { loginSuccess, loginWithEmailPassword } from './user.actions'

@Injectable()
export class UserEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginWithEmailPassword),
      tap((action) => console.log('effect', action.payload)),
      map(() => loginSuccess())
    )
  })

  constructor(private actions$: Actions) {}
}
