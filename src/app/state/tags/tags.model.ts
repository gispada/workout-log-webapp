import { NewEntity, UserEditableProp } from '../types'

export type Category = {
  _id: string
  name: UserEditableProp
  ownerId: string
  type: 'category'
}

export type Tag = {
  _id: string
  name: UserEditableProp
  ownerId: string
  type: 'tag'
  category?: string
}

export type TagEntity = Tag | Category

export type TagEntityDraft = TagEntity | NewEntity<TagEntity>

export type TagsState = {
  tags: Tag[]
  categories: Category[]
  tagModalOpened: boolean
  selected: string[]
  draft?: TagEntityDraft
}

export type TagGroup = { category: Category; tags: Tag[]; color?: string }
