import { createReducer, on } from '@ngrx/store'
import { loginSuccess, logoutSuccess } from './user.actions'
import { UserState } from './user.model'

const initialState: Readonly<UserState> = { profile: null }

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { payload }) => ({ ...state, ...payload })),
  on(logoutSuccess, () => initialState)
)
