import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type SideMenuItem = {
  title: string
  icon: IconProp
  linkUrl: string
}

export type Nullable<T> = T | null
