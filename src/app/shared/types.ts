import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table'

export type SideMenuItem = {
  i18nTitle: string
  icon: IconProp
  linkUrl: string
}

export type Nullable<T> = T | null

export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>

export type Dictionary<T> = Record<string, T>

export type TableColumn<T> = {
  title: string
  dataKey: string
  sortOrder?: NzTableSortOrder
  sortFn?: NzTableSortFn<T>
  width?: string
}

export type TableData = {
  [key: string]: any
}

export type TableCellTemplateCtx<T> = { record: T; dataKey: string }
