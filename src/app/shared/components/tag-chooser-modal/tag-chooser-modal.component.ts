import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input
} from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { debounce, distinctUntilChanged, map, startWith, Subject, timer } from 'rxjs'
import { tagsSelectors } from '@state/tags'
import { LocaleService } from '@core/services'
import { getThemeColor, prop, toBooleanDictionary, toggleListItem } from '@shared/utils'
import { Dictionary } from '@shared/types'

type QuerySub = { q: string; debounced?: boolean }

@Component({
  selector: 'app-tag-chooser-modal',
  templateUrl: './tag-chooser-modal.component.html',
  styleUrls: ['./tag-chooser-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagChooserModalComponent {
  private querySubject = new Subject<QuerySub>()
  tagsToExclude?: Dictionary<boolean>
  selected: string[] = []

  @Input() visible = false
  @Input() set excluded(value: string[] | undefined) {
    if (value) {
      // Hack to avoid changing 'tagsToExclude' while the closing animation is still on
      setTimeout(() => {
        this.tagsToExclude = toBooleanDictionary(value)
      })
    }
  }

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() selectTags = new EventEmitter<string[]>()

  query$ = this.querySubject.pipe(
    startWith<QuerySub>({ q: '' }),
    debounce(({ debounced }) => timer(debounced ? 500 : 0)),
    map(prop('q')),
    distinctUntilChanged()
  )

  tagGroups$ = this.store.select(tagsSelectors.selectTagsGroupedByCategory)

  // Tags and groups are translated here so that it's possible to filter by their name
  // Warning: this stream may not react to language change!
  translatedTagGroups$ = this.tagGroups$.pipe(
    map((groups) =>
      groups.map(({ tags, category }) => ({
        category: this.locale.getEditablePropValueSync(category),
        tags: tags.map((tag) => ({
          ...tag,
          name: this.locale.getEditablePropValueSync(tag.name)
        }))
      }))
    )
  )

  constructor(
    private store: Store,
    public translate: TranslateService,
    private locale: LocaleService
  ) {}

  closeModal() {
    this.visibleChange.emit(false)
  }

  changeQueryDebounced(q: string) {
    this.querySubject.next({ q, debounced: true })
  }

  changeQuery(q: string) {
    this.querySubject.next({ q })
  }

  toggleTagSelection(id: string) {
    this.selected = toggleListItem(this.selected, id)
  }

  handleOk() {
    this.selectTags.emit(this.selected)
    this.closeModal()
  }

  afterClose() {
    this.selected = []
  }

  getTagColor(i: number) {
    return getThemeColor(i)
  }
}
