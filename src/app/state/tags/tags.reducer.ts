import { createReducer, on } from '@ngrx/store'
import { removeFromList, toggleListItem } from '@shared/utils/lists'
import { assert } from '@shared/utils/miscellaneous'
import {
  draftCleared,
  existingTagEntityToDraft,
  newTagEntityToDraft,
  selectedTagsDeleteSuccess,
  tagDeleteSuccess,
  tagEntityEdited,
  tagSaveSuccess,
  tagsFetchSuccess,
  toggleTagModal,
  toggleTagSelection,
  toggleTagType
} from './tags.actions'
import { Category, Tag, TagEntity, TagEntityDraft, TagsState } from './tags.model'

const UNITIALIZED_DRAFT = 'Trying to edit a tag draft that was not initialized'

const initialState: Readonly<TagsState> = {
  tags: [],
  categories: [],
  selected: [],
  tagModalOpened: false
}

const groupEntityByType = (entities: TagEntity[]) => {
  return entities.reduce<[Tag[], Category[]]>(
    (acc, entity) => {
      const [tags, categories] = acc
      if (entity.type === 'tag') return [[...tags, entity], categories]
      if (entity.type === 'category') return [tags, [...categories, entity]]
      return acc
    },
    [[], []]
  )
}

export const tagsReducer = createReducer(
  initialState,
  on(tagsFetchSuccess, (state, { payload }) => {
    const [tags, categories] = groupEntityByType(payload)
    return { ...state, tags, categories }
  }),
  on(newTagEntityToDraft, (state) => ({
    ...state,
    tagModalOpened: true,
    draft: { name: { value: '' }, type: 'tag' }
  })),
  on(existingTagEntityToDraft, (state, { payload }) => ({
    ...state,
    tagModalOpened: true,
    draft: payload
  })),
  on(tagEntityEdited, (state, { payload }) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    return {
      ...state,
      draft: { ...state.draft, ...payload }
    }
  }),
  on(toggleTagType, (state) => {
    assert(state.draft, UNITIALIZED_DRAFT)
    const isTag = state.draft.type === 'tag'
    const newDraft = {
      ...state.draft,
      type: isTag ? 'category' : 'tag'
    } as TagEntityDraft
    if (isTag) {
      // Remove category when switching from tag to category
      // Setting it to undefined is not enough, as the API layer will convert undefined to null
      delete (newDraft as Tag).category
    }
    return { ...state, draft: newDraft }
  }),
  on(toggleTagSelection, (state, { payload }) => ({
    ...state,
    selected: toggleListItem(state.selected || [], payload)
  })),
  on(tagSaveSuccess, (state) => ({ ...state, tagModalOpened: false })),
  on(tagDeleteSuccess, (state, { payload }) => ({
    ...state,
    tagModalOpened: false,
    selected: removeFromList(state.selected, payload)
  })),
  on(selectedTagsDeleteSuccess, (state) => ({ ...state, selected: [] })),
  on(toggleTagModal, (state) => ({ ...state, tagModalOpened: !state.tagModalOpened })),
  on(draftCleared, (state) => ({ ...state, draft: undefined }))
)
