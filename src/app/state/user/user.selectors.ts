import { createSelector, createFeatureSelector } from '@ngrx/store'
import { UserState } from './user.model'

const selectUser = createFeatureSelector<UserState>('user')

export const selectConfirmationStatus = createSelector(
  selectUser,
  (state) => state.confirmationStatus
)
