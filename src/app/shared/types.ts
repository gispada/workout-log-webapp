import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type SideMenuItem = {
  i18nTitle: string
  icon: IconProp
  linkUrl: string
}

export type Nullable<T> = T | null

export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>
