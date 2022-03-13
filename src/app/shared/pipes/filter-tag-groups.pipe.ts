import { Pipe, PipeTransform } from '@angular/core'
import { Tag } from '@state/tags'
import { Translated } from '@state/types'

type TagGroup = { category: string; tags: Translated<Tag>[] }

@Pipe({ name: 'filterTagGroups' })
export class FilterTagGroupsPipe implements PipeTransform {
  transform(groups: TagGroup[], query?: string) {
    if (!query) return groups

    return groups.reduce<TagGroup[]>((acc, { tags, ...rest }) => {
      const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(query.toLowerCase())
      )
      return filteredTags.length > 0 ? [...acc, { ...rest, tags: filteredTags }] : acc
    }, [])
  }
}
