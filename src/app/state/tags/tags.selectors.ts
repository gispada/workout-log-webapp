import { createSelector, createFeatureSelector } from '@ngrx/store'
import { UserEditableProp } from '@state/types'
import { Dictionary } from '@shared/types'
import { keyBy, prop } from '@shared/utils'
import { TagsState, Tag } from './tags.model'

type TagsByCategory = Dictionary<{ category: UserEditableProp; tags: Tag[] }>

const UNCATEGORIZED = {
  id: '_uncategorized_',
  name: { i18nValue: 'Tags.Categories.Uncategorized' }
}

const selectTagsState = createFeatureSelector<TagsState>('tags')

export const selectTags = createSelector(selectTagsState, prop('tags'))

export const selectCategories = createSelector(selectTagsState, prop('categories'))

export const selectTagsById = createSelector(selectTags, (tags) => keyBy(tags, 'id'))

export const selectCategoriesById = createSelector(selectCategories, (categories) =>
  keyBy(categories, 'id')
)

export const selectTagsGroupedByCategory = createSelector(
  selectTags,
  selectCategoriesById,
  (tags, categoriesDict) => {
    const tagsByCategory = tags.reduce<TagsByCategory>((acc, tag) => {
      const category = tag.category ? categoriesDict[tag.category] : UNCATEGORIZED
      return {
        ...acc,
        [category.id]: {
          category: category.name,
          tags: [...(acc[category.id]?.tags || []), tag]
        }
      }
    }, {})
    return Object.values(tagsByCategory)
  }
)

export const selectPopulatedTags = (tagIds: string[]) =>
  createSelector(selectTagsById, (tagsById) => {
    return tagIds.map((id) => tagsById[id])
  })
