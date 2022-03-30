import { httpRequest } from '.'

export function getWriteTagsAndGroups() {
  return httpRequest('/filter')
}
