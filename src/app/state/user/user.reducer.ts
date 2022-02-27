import { createReducer, on } from '@ngrx/store'
import {
  confirmationStatusChanged,
  loginSuccess,
  logoutSuccess,
  userInitialized
} from './user.actions'
import { UserState } from './user.model'

const initialState: Readonly<UserState> = { isLoggedIn: false, profile: null }

export const userReducer = createReducer(
  initialState,
  on(userInitialized, loginSuccess, (state, { payload }) => ({
    ...state,
    ...payload,
    isLoggedIn: true,
    confirmationStatus: undefined
  })),
  on(confirmationStatusChanged, (state, { payload }) => ({
    ...state,
    confirmationStatus: payload
  })),
  on(logoutSuccess, () => initialState)
)
