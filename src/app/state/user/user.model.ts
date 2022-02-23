import { Nullable } from '@shared/types'

export type UserProfile = {
  name?: string
  email?: string
  pictureUrl?: string
  firstName?: string
  lastName?: string
  gender?: string
  birthday?: string
}

export type UserState = {
  profile: Nullable<UserProfile>
  extraData?: Record<string, unknown>
}
