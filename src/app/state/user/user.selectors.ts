import { createSelector, createFeatureSelector } from '@ngrx/store'
import { UserState } from './user.model'

const selectUser = createFeatureSelector<UserState>('user')

export const selectConfirmationStatus = createSelector(
  selectUser,
  (state) => state.confirmationStatus
)

export const selectIsLoggedIn = createSelector(selectUser, (state) => state.isLoggedIn)

export const selectProfile = createSelector(selectUser, (state) => state.profile)

export const selectInitials = createSelector(selectProfile, (profile) => {
  if (!profile) return ''

  const { firstName, lastName, name, email } = profile

  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`

  if (name) {
    const [first, second] = name.split(' ')
    return `${first[0]}${second ? second[0] : ''}`
  }

  return email![0].toUpperCase() // The email should always exist
})
