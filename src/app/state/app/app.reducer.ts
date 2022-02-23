import { createReducer } from '@ngrx/store'
import { AppState } from './app.model'

const initialState: Readonly<AppState> = {}

export const appReducer = createReducer(initialState)
