import { httpRequest } from '.'

export interface TagAndGroupItem {
  label: string
  id: number
}

export interface BlogData {
  title: string
  tags: TagAndGroupItem[]
  group: TagAndGroupItem
  publishTime: number
  viewCount: number
  id: string
  description: string
}

export interface BlogListData {
  listTotalPage: number
  data: BlogData[]
}

export function getBlogListData() {
  return httpRequest('/blogList')
}
