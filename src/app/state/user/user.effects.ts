import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { delay, map, switchMap, mapTo, tap } from 'rxjs'
import { appActions } from '@state/app'
import { FeedbackService, UserApiService } from '@core/services'
import { HOME, SIGNIN } from '@config/routes'
import {
  loginSuccess,
  loginWithEmailPassword,
  logout,
  registerWithEmailPassword,
  confirmUser
} from './user.actions'

@Injectable()
export class UserEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginWithEmailPassword),
      switchMap(({ payload }) => this.userApi.login(payload)),
      map((user) => loginSuccess({ profile: user.profile, extraData: user.customData }))
    )
  })

  register$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerWithEmailPassword),
        switchMap(({ payload }) => this.userApi.registerUser(payload)),
        tap(() =>
          this.feedback.displayMessage({
            i18nText: 'RegistrationSuccess',
            type: 'success'
          })
        )
      )
    },
    { dispatch: false }
  )

  confirmUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(confirmUser),
      delay(2000),
      switchMap(({ payload }) => this.userApi.confirmUser(payload)),
      tap(() =>
        this.feedback.displayMessage({ i18nText: 'ConfirmationSuccess', type: 'success' })
      ),
      mapTo(appActions.navigate(`/${SIGNIN}`))
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      switchMap(() => this.userApi.logout()),
      mapTo(appActions.navigate(`/${SIGNIN}`))
    )
  })

  onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      mapTo(appActions.navigate(`/${HOME}`))
    )
  })

  constructor(
    private actions$: Actions,
    private userApi: UserApiService,
    private feedback: FeedbackService
  ) {}
}
