import { Dictionary, Nullable } from '@shared/types'

export type UserProfile = {
  name?: string
  email?: string
  pictureUrl?: string
  firstName?: string
  lastName?: string
  gender?: string
  birthday?: string
}

export type ConfirmationStatus = {
  status: 'success' | 'failed'
  message: string
}

export type UserState = {
  isLoggedIn: boolean
  profile: Nullable<UserProfile>
  userId: Nullable<string>
  extraData?: Dictionary<unknown>
  confirmationStatus?: ConfirmationStatus
}
