import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table'

export type SideMenuItem = {
  i18nTitle: string
  icon: IconProp
  linkUrl: string
}

export type Nullable<T> = T | null

export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>

export type TableColumn<T> = {
  title: string
  dataKey: string
  sortOrder?: NzTableSortOrder
  sortFn?: NzTableSortFn<T>
}

export type TableData = {
  [key: string]: any
}
