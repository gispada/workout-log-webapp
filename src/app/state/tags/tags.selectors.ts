import { createSelector, createFeatureSelector } from '@ngrx/store'
import { keyBy } from '@shared/utils'
import { TagsState } from './tags.model'

const selectTagsState = createFeatureSelector<TagsState>('tags')

export const selectTags = createSelector(selectTagsState, (state) => state.tags)

export const selectTagsById = createSelector(selectTags, (tags) => keyBy(tags, 'id'))
