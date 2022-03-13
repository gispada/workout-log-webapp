import { UserEditableProp } from '../types'

export type Category = { id: string; name: UserEditableProp }

export type Tag = {
  id: string
  name: UserEditableProp
  category?: string
  color?: string
}

export type TagsState = {
  tags: Tag[]
  categories: Category[]
}
