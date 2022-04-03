import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { appSelectors } from '@state/app'
import { Tag, TagEntity, TagGroup, tagsActions, tagsSelectors } from '@state/tags'

const {
  existingTagEntityToDraft,
  newTagEntityToDraft,
  toggleTagSelection,
  selectedTagsDelete
} = tagsActions

@Component({
  selector: 'settings-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  tagsByCategory$ = this.store.select(tagsSelectors.selectGroupedTagsWithAllCategories)
  selected$ = this.store.select(tagsSelectors.selectSelectedTags)
  deleteLoading$ = this.store.select(appSelectors.selectLoadingStatus('tags.delete'))

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(tagsActions.tagsFetch())
  }

  categoryTrackBy(_: number, item: TagGroup) {
    return item.category._id
  }

  tagTrackBy(_: number, item: Tag) {
    return item._id
  }

  setTagToEdit(entity?: TagEntity) {
    this.store.dispatch(entity ? existingTagEntityToDraft(entity) : newTagEntityToDraft())
  }

  toggleTag(id: string) {
    this.store.dispatch(toggleTagSelection(id))
  }

  deleteSelected() {
    this.store.dispatch(selectedTagsDelete())
  }
}
