import { httpRequest } from '.'
import { TagAndGroupItem } from './blog'

export interface TagsAndGroupData {
  groups: TagAndGroupItem[]
  tags: TagAndGroupItem[]
}

export function getWriteTagsAndGroups() {
  return httpRequest('/filter')
}
