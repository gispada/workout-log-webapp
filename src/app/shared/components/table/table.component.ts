import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core'
import { Dictionary, TableCellTemplateCtx, TableColumn, TableData } from '@shared/types'
import { toggleListItem } from '@shared/utils/lists'
import { prop } from '@shared/utils/miscellaneous'
import { TableCellForDirective } from './table-cell-for.directive'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends TableData> implements AfterContentInit {
  customCellTemplates!: Dictionary<TemplateRef<TableCellTemplateCtx<T>>>

  @Input() columns!: TableColumn<T>[]
  @Input() dataSource!: T[]
  @Input() paginationSize?: number
  @Input() allowSelection? = false
  @Input() selected?: string[] // Selection only works in controlled mode, for now...
  @Input() loading? = false
  @Input() rowIdKey = '_id'

  @Output() selectedChange = new EventEmitter<string[]>()

  @ContentChildren(TableCellForDirective) tableCellDirectives!: QueryList<
    TableCellForDirective<T>
  >

  ngAfterContentInit() {
    this.customCellTemplates = this.tableCellDirectives.reduce(
      (acc, { templateMap }) => ({ ...acc, ...templateMap }),
      {}
    )
  }

  get allSelected() {
    if (!this.selected) return false
    return this.selected.length > 0 && this.selected.length === this.dataSource.length
  }

  get someSelected() {
    if (!this.selected) return false
    return this.selected.length > 0 && this.selected.length < this.dataSource.length
  }

  trackBy(_: number, item: T) {
    return item[this.rowIdKey]
  }

  onSelectAll(selected: boolean) {
    this.selectedChange.emit(selected ? this.dataSource.map(prop(this.rowIdKey)) : [])
  }

  onSelectSingle(_: boolean, record: T) {
    const rowId = record[this.rowIdKey]
    this.selectedChange.emit(toggleListItem(this.selected || [], rowId))
  }
}
