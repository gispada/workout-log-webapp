import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core'

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListActionsComponent {
  @Input() newEntityText!: string
  @Input() newEntityUrl?: string

  // @Input() editEntityText?: string
  // @Input() editLoading? = false
  // @Input() showEditButton? = false

  @Input() deleteEntityConfirmText?: string
  @Input() deleteEntityOkText?: string
  @Input() deleteEntityCancelText?: string
  @Input() deleteLoading? = false
  @Input() showDeleteButton? = false

  @Output() add = new EventEmitter<void>()
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()
}
