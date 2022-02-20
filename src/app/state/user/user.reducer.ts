import { createReducer, on } from '@ngrx/store'
import { loginSuccess } from './user.actions'

export type UserState = {
  token?: string
}

const initialState: Readonly<UserState> = {}

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state) => ({ ...state, token: 'abc' }))
)
