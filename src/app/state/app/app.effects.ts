import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'
import { filter, map } from 'rxjs'
import { isActionWithLoading } from '../utils'
import { loadingChanged } from './app.actions'

@Injectable()
export class AppEffects {
  loading$ = createEffect(() => {
    return this.actions$.pipe(
      filter(isActionWithLoading),
      map(({ meta }) => loadingChanged({ key: meta.key, value: meta.loading }))
    )
  })

  constructor(private actions$: Actions) {}
}
