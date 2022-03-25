import { httpRequest } from '.'

export interface tagAndGroupItem {
  label: string
  id: string
}

export interface BlogData {
  title: string
  tags: tagAndGroupItem[]
  group: tagAndGroupItem
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
