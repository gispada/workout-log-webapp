import { createReducer, on } from '@ngrx/store'
import { loadingChanged } from './app.actions'
import { AppState } from './app.model'

const initialState: Readonly<AppState> = { loading: {} }

export const appReducer = createReducer(
  initialState,
  on(loadingChanged, (state, { payload }) => ({
    ...state,
    loading: { ...state.loading, [payload.key]: payload.value }
  }))
)
