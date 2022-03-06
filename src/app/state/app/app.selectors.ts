import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AppState } from './app.model'

const selectAppState = createFeatureSelector<AppState>('app')

const selectLoading = createSelector(selectAppState, (state) => state.loading)

export const selectLoadingStatus = (key: string) =>
  createSelector(selectLoading, (state) => state[key])
