import { httpRequest } from '.'
export type { BlogListData } from './blog'

export function getDraftList() {
  return httpRequest('/blogDraftList')
}
