import { Component, Input } from '@angular/core'
import { TableColumn, TableData } from '@shared/types'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T extends TableData> {
  @Input() columns!: TableColumn<T>[]
  @Input() dataSource!: T[]
  @Input() paginationSize?: number
}
