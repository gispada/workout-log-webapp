import { Directive, Input, TemplateRef } from '@angular/core'
import { Dictionary, TableCellTemplateCtx } from '@shared/types'

/**
 * This directive registers the template to which it is bound
 * as the custom table cell for the column with the same
 * `dataKey` provided in `appTableCellFor`.
 * Providing an array of strings will register the same template
 * for multiple columns.
 */
@Directive({
  selector: '[appTableCellFor]'
})
export class TableCellForDirective<T> {
  @Input() appTableCellFor!: string | string[]

  get templateMap(): Dictionary<typeof this.templateRef> {
    return Array.isArray(this.appTableCellFor)
      ? this.appTableCellFor.reduce(
          (acc, col) => ({ ...acc, [col]: this.templateRef }),
          {}
        )
      : { [this.appTableCellFor]: this.templateRef }
  }

  constructor(private templateRef: TemplateRef<TableCellTemplateCtx<T>>) {}
}
