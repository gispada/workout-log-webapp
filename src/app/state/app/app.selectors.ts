import { createSelector, createFeatureSelector } from '@ngrx/store'
import { AppState } from './app.model'

const selectApp = createFeatureSelector<AppState>('app')

const selectLoading = createSelector(selectApp, (state) => state.loading)

export const selectLoadingStatus = (key: string) =>
  createSelector(selectLoading, (state) => state[key])
