import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Dictionary } from '@shared/types'
import { getThemeColor, keyBy, prop } from '@shared/utils/miscellaneous'
import { addToList } from '@shared/utils/lists'
import { TagsState, Category, TagGroup } from './tags.model'

const UNCATEGORIZED: Category = {
  _id: '_uncategorized_',
  type: 'category',
  name: { i18nValue: 'Tags.Categories.Uncategorized' },
  ownerId: '' // Does not matter here
}

const addColor = (group: TagGroup, i: number) => ({ ...group, color: getThemeColor(i) })

const selectTagsState = createFeatureSelector<TagsState>('tags')

export const selectTags = createSelector(selectTagsState, prop('tags'))

export const selectCategories = createSelector(selectTagsState, prop('categories'))

export const selectTagsById = createSelector(selectTags, (tags) => keyBy(tags, '_id'))

export const selectCategoriesById = createSelector(selectCategories, (categories) =>
  keyBy(categories, '_id')
)

export const selectTagsByCategory = createSelector(
  selectTags,
  selectCategoriesById,
  (tags, categoriesDict) => {
    return tags.reduce<Dictionary<TagGroup>>((acc, tag) => {
      const category = tag.category ? categoriesDict[tag.category] : UNCATEGORIZED
      return {
        ...acc,
        [category._id]: { category, tags: addToList(acc[category._id]?.tags, tag) }
      }
    }, {})
  }
)

/** Returns an array of categories with their tags. Categories without tags are excluded. */
export const selectTagsGroupedByCategory = createSelector(
  selectTagsByCategory,
  ({ _uncategorized_, ...rest }) =>
    Object.values(rest)
      .concat(_uncategorized_ || [])
      .map(addColor)
)

/** Returns an array of categories with their tags. All categories are included, even if they have no tags. */
export const selectGroupedTagsWithAllCategories = createSelector(
  selectTagsByCategory,
  selectCategories,
  ({ _uncategorized_, ...tagsByCategory }, categories) => {
    const emptyCategories = categories
      .filter(({ _id }) => !tagsByCategory[_id])
      .map((category) => ({ category, tags: [] }))

    return Object.values(tagsByCategory)
      .concat(_uncategorized_ || [], emptyCategories)
      .map(addColor)
  }
)

export const selectPopulatedTags = (tagIds: string[]) =>
  createSelector(selectTagsById, (tagsById) => {
    return tagIds.map((id) => tagsById[id])
  })

export const selectDraft = createSelector(selectTagsState, prop('draft'))

export const selectSelectedTags = createSelector(selectTagsState, prop('selected'))

export const selectTagModalVisible = createSelector(
  selectTagsState,
  prop('tagModalOpened')
)
