import { createAction } from '@ngrx/store'
import { withPayload } from '@shared/utils'

export const loginWithEmailPassword = createAction(
  '[Auth Page] Email/password login',
  withPayload<{ email: string; password: string }>()
)

export const loginWithGoogle = createAction('[Auth Page] Google login')

export const registerWithEmailPassword = createAction(
  '[Auth Page] Email/password registration',
  withPayload<{ email: string; password: string }>()
)

export const loginSuccess = createAction('[Auth API] Login success')

export const loginError = createAction('[Auth API] Login error')
