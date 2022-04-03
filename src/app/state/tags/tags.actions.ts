import { createAction } from '@ngrx/store'
import { withActionData, loadingMetaFactory } from '@state/utils'
import { TagEntity } from './tags.model'

const [fetchLoading, saveLoading, deleteLoading] = loadingMetaFactory([
  'tags.fetch',
  'tags.save',
  'tags.delete'
])

// -------------------- Fetching -------------------- //

export const tagsFetch = createAction(
  '[Tags] Fetch all tags',
  withActionData(fetchLoading(true))
)

export const tagsFetchSuccess = createAction(
  '[Tags API] Fetch all tags success',
  withActionData<TagEntity[]>(fetchLoading(false))
)

// -------------------- Editing -------------------- //

export const existingTagEntityToDraft = createAction(
  '[Tags page] Existing tag entity to draft',
  withActionData<TagEntity>()
)

export const newTagEntityToDraft = createAction('[Tags page] New tag entity to draft')

export const tagEntityEdited = createAction(
  '[Tags page] Tag entity edited',
  withActionData<Partial<TagEntity>>()
)

export const toggleTagType = createAction('[Tags page] Toggle tag type')

export const draftCleared = createAction('[Tags page] Draft cleared')

export const toggleTagSelection = createAction(
  '[Tags page] Toggle tag selection',
  withActionData<string>()
)

// -------------------- Saving -------------------- //

export const tagSave = createAction(
  '[Tags page] Tag draft save',
  withActionData(saveLoading(true))
)

export const tagSaveSuccess = createAction(
  '[Tags API] Tag draft save success',
  withActionData(saveLoading(false))
)

// -------------------- Deleting -------------------- //

export const draftTagDelete = createAction(
  '[Tags page] Delete tag in draft',
  withActionData(deleteLoading(true))
)

export const selectedTagsDelete = createAction(
  '[Tags page] Delete selected tags',
  withActionData(deleteLoading(true))
)

export const removeCategoryFromTags = createAction(
  '[Tags API] Remove category from tags',
  withActionData<string>()
)

export const tagDeleteSuccess = createAction(
  '[Tags API] Tag delete success',
  withActionData<string>(deleteLoading(false))
)

export const selectedTagsDeleteSuccess = createAction(
  '[Tags API] Selected tags delete success',
  withActionData(deleteLoading(false))
)

export const toggleTagModal = createAction('[Tags page] Toggle tag modal')
