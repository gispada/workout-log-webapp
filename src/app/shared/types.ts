import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type SideMenuItem = {
  i18nTitle: string
  icon: IconProp
  linkUrl: string
}

export type Nullable<T> = T | null
