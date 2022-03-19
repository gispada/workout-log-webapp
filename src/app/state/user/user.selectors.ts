import { createSelector, createFeatureSelector } from '@ngrx/store'
import { prop } from '@shared/utils/miscellaneous'
import { UserState } from './user.model'

const selectUserState = createFeatureSelector<UserState>('user')

export const selectConfirmationStatus = createSelector(
  selectUserState,
  prop('confirmationStatus')
)

export const selectIsLoggedIn = createSelector(selectUserState, prop('isLoggedIn'))

export const selectProfile = createSelector(selectUserState, prop('profile'))

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
