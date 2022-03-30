import { httpRequest, httpPostJsonRequest } from '.'
import { TagAndGroupItem } from './blog'

export interface TagsAndGroupData {
  code: number
  data: {
    groups: TagAndGroupItem[]
    tags: TagAndGroupItem[]
  }
}

export function getGroupAndTags() {
  return httpRequest('groupAndTags')
}

export function updateTag(data: { id?: number; label: string }) {
  return httpPostJsonRequest('updateTag', data)
}

export function removeTag(data: { id: number }) {
  return httpPostJsonRequest('removeTag', data)
}
