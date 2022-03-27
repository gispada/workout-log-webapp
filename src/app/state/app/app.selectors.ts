import { createSelector, createFeatureSelector } from '@ngrx/store'
import { prop } from '@shared/utils/miscellaneous'
import { AppState, LoadingKey } from './app.model'

const selectAppState = createFeatureSelector<AppState>('app')

const selectLoading = createSelector(selectAppState, prop('loading'))

export const selectLoadingStatus = (key: LoadingKey) =>
  createSelector(selectLoading, prop(key))
