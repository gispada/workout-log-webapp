import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core'
import { Store } from '@ngrx/store'
import { map, ReplaySubject, switchMap } from 'rxjs'
import { tagsSelectors } from '@state/tags'

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent {
  private tagIdsSubject = new ReplaySubject<string[]>(1)

  @Input() set tagIds(value: string[] | undefined) {
    this.tagIdsSubject.next(value || [])
  }
  @Input() interactive = false
  @Input() inverted = false
  @Input() max?: number

  @Output() delete = new EventEmitter<string>()
  @Output() add = new EventEmitter<undefined>()

  private tagIds$ = this.tagIdsSubject.asObservable()

  remainingTags$ = this.tagIds$.pipe(
    map((tagIds) => (this.max ? tagIds.length - this.max : 0))
  )

  // Keep populated tags in sync with @Input tagIds... is it the right way?
  populatedTags$ = this.tagIds$.pipe(
    map((tagIds) => (this.max ? tagIds.slice(0, this.max) : tagIds)),
    switchMap((tagIds) => this.store.select(tagsSelectors.selectPopulatedTags(tagIds)))
  )

  constructor(private store: Store) {}
}
