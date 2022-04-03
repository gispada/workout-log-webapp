import { Pipe, PipeTransform } from '@angular/core'
import { Dictionary } from '@shared/types'
import { Tag, TagGroup } from '@state/tags'
import { Translated } from '@state/types'

type TranslatedTagGroup = Omit<TagGroup, 'category' | 'tags'> & {
  category: string
  tags: Translated<Tag>[]
}

@Pipe({ name: 'filterTagGroups' })
export class FilterTagGroupsPipe implements PipeTransform {
  transform(
    groups: TranslatedTagGroup[],
    query?: string,
    excluded?: Dictionary<boolean>
  ) {
    if (!query && !excluded) return groups

    return groups.reduce<TranslatedTagGroup[]>((acc, { tags, ...rest }) => {
      const filteredTags = tags.filter(
        (tag) =>
          (excluded ? !excluded[tag._id] : true) &&
          (query ? tag.name.toLowerCase().includes(query.toLowerCase()) : true)
      )
      return filteredTags.length > 0 ? [...acc, { ...rest, tags: filteredTags }] : acc
    }, [])
  }
}
