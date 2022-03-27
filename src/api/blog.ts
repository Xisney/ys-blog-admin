import { httpRequest } from '.'

export interface TagAndGroupItem {
  label: string
  id: string
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
  dataList: BlogData[]
}

export function getBlogListData() {
  return httpRequest('/list')
}
