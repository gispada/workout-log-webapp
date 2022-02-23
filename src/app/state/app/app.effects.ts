import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs'
import { Router } from '@angular/router'
import { navigate } from './app.actions'

@Injectable()
export class AppEffects {
  navigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(navigate),
        map(({ payload }) =>
          this.router.navigateByUrl(typeof payload === 'string' ? payload : payload.to)
        )
      )
    },
    { dispatch: false }
  )

  constructor(private actions$: Actions, private router: Router) {}
}
