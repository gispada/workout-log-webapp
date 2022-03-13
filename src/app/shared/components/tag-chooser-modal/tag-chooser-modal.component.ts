import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { debounce, distinctUntilChanged, map, startWith, Subject, timer } from 'rxjs'
import { tagsSelectors } from '@state/tags'
import { ModalService, LocaleService } from '@core/services'
import { getThemeColor, prop } from '@shared/utils'

type QuerySub = { q: string; debounced?: boolean }

@Component({
  selector: 'app-tag-chooser-modal',
  templateUrl: './tag-chooser-modal.component.html',
  styleUrls: ['./tag-chooser-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagChooserModalComponent {
  private querySubject = new Subject<QuerySub>()

  visible$ = this.modal.isVisible('AddTags')

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
    public modal: ModalService,
    public translate: TranslateService,
    private locale: LocaleService
  ) {}

  changeQueryDebounced(q: string) {
    this.querySubject.next({ q, debounced: true })
  }

  changeQuery(q: string) {
    this.querySubject.next({ q })
  }

  handleOk() {
    console.log('Do something')
  }

  getTagColor(i: number) {
    return getThemeColor(i)
  }
}
