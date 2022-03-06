import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { tagsSelectors } from '@state/tags'

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent {
  @Input() tagIds: string[] = []
  @Input() interactive = false
  @Input() max?: number

  @Output() delete = new EventEmitter<string>()
  @Output() add = new EventEmitter<undefined>()

  get remainingTags() {
    return this.max ? this.tagIds.length - this.max : 0
  }

  tagsById$ = this.store.select(tagsSelectors.selectTagsById)

  // TODO: move to a selector?
  populatedTags$ = this.tagsById$.pipe(
    map((tagsById) => this.tagIds.map((id) => tagsById[id])),
    map((tags) => (this.max ? tags.slice(0, this.max) : tags))
  )

  constructor(private store: Store) {}
}
