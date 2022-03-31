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

export function updateGroup(data: { id?: number; label: string }) {
  return httpPostJsonRequest('updateGroup', data)
}

export function removeGroup(data: { id: number }) {
  return httpPostJsonRequest('removeGroup', data)
}
