import { createReducer, on } from '@ngrx/store'
import {
  loadingChanged,
  modalClosed,
  modalOpened,
  modalOpenedWithData
} from './app.actions'
import { AppState } from './app.model'

const initialState: Readonly<AppState> = {
  loading: {},
  modal: { visible: false }
}

export const appReducer = createReducer(
  initialState,
  on(loadingChanged, (state, { payload }) => ({
    ...state,
    loading: { ...state.loading, [payload.key]: payload.value }
  })),
  on(modalOpened, modalOpenedWithData, (state, { payload }) => ({
    ...state,
    modal: { visible: true, ...payload }
  })),
  on(modalClosed, (state) => ({
    ...state,
    modal: { visible: false }
  }))
)
