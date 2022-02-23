import { createAction } from '@ngrx/store'
import { withPayload } from '@shared/utils'
import { Credentials, EmailConfirmParams } from '@core/types'
import { UserProfile } from './user.model'

export const loginWithEmailPassword = createAction(
  '[Auth Page] Email/password login',
  withPayload<Credentials>()
)

export const loginWithGoogle = createAction('[Auth Page] Google login')

export const registerWithEmailPassword = createAction(
  '[Auth Page] Email/password registration',
  withPayload<Credentials>()
)

export const loginSuccess = createAction(
  '[Auth API] Login success',
  withPayload<{ profile: UserProfile; extraData?: Record<string, unknown> }>()
)

export const loginError = createAction('[Auth API] Login error')

export const logout = createAction('[Auth Page] Logout')

export const logoutSuccess = createAction('[Auth API] Logout success')

export const confirmUser = createAction(
  '[Auth Page] Confirm user',
  withPayload<EmailConfirmParams>()
)
