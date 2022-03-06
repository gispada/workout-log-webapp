import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import {
  map,
  exhaustMap,
  mapTo,
  catchError,
  of,
  throttleTime,
  tap,
  delay,
  filter,
  switchMap
} from 'rxjs'
import { FeedbackService, UserApiService } from '@core/services'
import { AuthenticationError } from '@core/types/api'
import { HOME, SIGNIN } from '@config/routes'
import { Dictionary } from '@shared/types'
import {
  loginSuccess,
  emailAndPasswordLogin,
  logout,
  emailAndPasswordRegistration,
  emailConfirmation,
  authError,
  registrationSuccess,
  confirmationStatusChanged,
  logoutSuccess,
  userInitialized,
  googleLogin
} from './user.actions'

const i18nKeysMap: Dictionary<string> = {
  InvalidPassword: 'LoginFailed',
  AccountNameInUse: 'RegistrationExistingEmail'
}

const mapApiErrorToI18nKey = (code: string) => i18nKeysMap[code]

@Injectable()
export class UserEffects {
  initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => this.userApi.getCurrentUser()),
      filter(Boolean),
      map((user) =>
        userInitialized({ profile: user.profile, extraData: user.customData })
      )
    )
  })

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailAndPasswordLogin),
      exhaustMap(({ payload }) =>
        this.userApi.login(payload).pipe(
          map((user) =>
            loginSuccess({ profile: user.profile, extraData: user.customData })
          ),
          catchError(({ errorCode }: AuthenticationError) => of(authError(errorCode)))
        )
      )
    )
  })

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailAndPasswordRegistration),
      throttleTime(1000),
      exhaustMap(({ payload }) =>
        this.userApi.registerUser(payload).pipe(
          mapTo(registrationSuccess()),
          catchError(({ errorCode }: AuthenticationError) => of(authError(errorCode)))
        )
      )
    )
  })

  confirmUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emailConfirmation),
      exhaustMap(({ payload }) => this.userApi.confirmUser(payload)),
      mapTo(
        confirmationStatusChanged({ status: 'success', message: 'ConfirmationSuccess' })
      ),
      catchError(() =>
        of(confirmationStatusChanged({ status: 'failed', message: 'ConfirmationFailed' }))
      )
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => this.userApi.logout()),
      mapTo(logoutSuccess())
    )
  })

  loginWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(googleLogin),
      exhaustMap(() =>
        this.userApi.loginWithGoogle().pipe(
          map((user) =>
            loginSuccess({ profile: user.profile, extraData: user.customData })
          ),
          catchError(() => of(authError('GoogleLoginAborted')))
        )
      )
    )
  })

  // -------------------- Non-dispatching effects -------------------- //

  redirectToHome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigateByUrl(`/${HOME}`))
      )
    },
    { dispatch: false }
  )

  redirectToLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => this.router.navigateByUrl(`/${SIGNIN}`))
      )
    },
    { dispatch: false }
  )

  displayError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authError),
        tap(({ payload }) => {
          this.feedback.displayMessage({
            i18nText: mapApiErrorToI18nKey(payload) || payload,
            type: 'error'
          })
        })
      )
    },
    { dispatch: false }
  )

  onRegistrationSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registrationSuccess),
        tap(() => {
          this.feedback.displayMessage({
            i18nText: 'RegistrationSuccess',
            type: 'success'
          })
        })
      )
    },
    { dispatch: false }
  )

  onConfirmationDone$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(confirmationStatusChanged),
        delay(3000),
        tap(() => this.router.navigateByUrl(`/${SIGNIN}`))
      )
    },
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private userApi: UserApiService,
    private feedback: FeedbackService,
    private router: Router
  ) {}
}
