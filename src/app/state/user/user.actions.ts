import { createAction } from '@ngrx/store'
import { Credentials, EmailConfirmParams } from '@core/types/api'
import { Dictionary } from '@shared/types'
import { withActionData } from '../utils'
import { UserProfile, ConfirmationStatus } from './user.model'

type UserData = { profile: UserProfile; userId: string; extraData?: Dictionary<unknown> }

const loading = (value: boolean) => ({ loading: value, key: 'auth' })

export const userInitialized = createAction(
  '[Auth] User initialized',
  withActionData<UserData>()
)

export const emailAndPasswordLogin = createAction(
  '[Auth Page] Email/password login',
  withActionData<Credentials>(loading(true))
)

export const googleLogin = createAction('[Auth Page] Google login')

export const emailAndPasswordRegistration = createAction(
  '[Auth Page] Email/password registration',
  withActionData<Credentials>(loading(true))
)

export const logout = createAction('[Auth Page] Logout')

export const emailConfirmation = createAction(
  '[Auth Page] User email confirmation',
  withActionData<EmailConfirmParams>()
)

// Actions triggered by remote API responses

export const loginSuccess = createAction(
  '[Auth API] Login success',
  withActionData<UserData>(loading(false))
)

export const registrationSuccess = createAction(
  '[Auth API] Registration success',
  withActionData(loading(false))
)

export const logoutSuccess = createAction('[Auth API] Logout success')

export const authError = createAction(
  '[Auth API] Auth error',
  withActionData<string>(loading(false))
)

export const confirmationStatusChanged = createAction(
  '[Auth API] Confirmation status changed',
  withActionData<ConfirmationStatus>()
)
