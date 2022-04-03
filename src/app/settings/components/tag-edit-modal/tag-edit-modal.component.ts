import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { combineLatest, map } from 'rxjs'
import { LocaleService } from '@core/services'
import { Tag, TagEntity, TagEntityDraft, tagsActions, tagsSelectors } from '@state/tags'
import { appSelectors } from '@state/app'
import { displayInvalidFormControls } from '@shared/utils/miscellaneous'

const {
  tagEntityEdited,
  toggleTagType,
  draftCleared,
  toggleTagModal,
  tagSave,
  draftTagDelete
} = tagsActions

@Component({
  selector: 'tags-edit-modal',
  templateUrl: './tag-edit-modal.component.html',
  styleUrls: ['./tag-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagEditModalComponent {
  private categories$ = this.store.select(tagsSelectors.selectCategories)

  visible$ = this.store.select(tagsSelectors.selectTagModalVisible)
  draft$ = this.store.select(tagsSelectors.selectDraft)

  loading$ = combineLatest({
    saving: this.store.select(appSelectors.selectLoadingStatus('tags.save')),
    deleting: this.store.select(appSelectors.selectLoadingStatus('tags.delete'))
  })

  categoryOptions$ = this.categories$.pipe(
    map((categories) =>
      categories.map(({ _id, name }) => ({
        value: _id,
        label: this.locale.getEditablePropValueSync(name)
      }))
    )
  )

  constructor(private store: Store, private locale: LocaleService) {}

  getModalTitle(entity?: TagEntityDraft) {
    if (!entity) return ''
    return `Tags.${this.isExistingTag(entity) ? 'EditTag' : 'AddNew'}`
  }

  isTagType(entity: TagEntityDraft): entity is Tag {
    return entity.type === 'tag'
  }

  // Checking if it exists, not if it's new, because of some strange behaviour when type narrowing
  isExistingTag(entity: TagEntityDraft): entity is TagEntity {
    return '_id' in entity
  }

  toggleTagType() {
    this.store.dispatch(toggleTagType())
  }

  editTagProperty(property: Partial<TagEntity>) {
    this.store.dispatch(tagEntityEdited(property))
  }

  saveTag(form: NgForm) {
    if (!form.valid) {
      return displayInvalidFormControls(form.controls)
    }
    this.store.dispatch(tagSave())
  }

  deleteTag() {
    this.store.dispatch(draftTagDelete())
  }

  closeModal() {
    this.store.dispatch(toggleTagModal())
  }

  afterClose() {
    // Can't clear data while modal is closing
    this.store.dispatch(draftCleared())
  }
}
