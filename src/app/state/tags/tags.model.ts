export type Tag = {
  id: string
  name: string
  category?: string
  color?: string
}

export type TagsState = {
  tags: Tag[]
}
