import { httpPostJsonRequest, httpRequest } from '.'

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
  id: number
  description: string
}

export interface BlogListData {
  code: number
  data: BlogData[]
}

export function getBlogListData() {
  return httpRequest('/blogList')
}

export function deleteBlog(data: { id: number }) {
  return httpPostJsonRequest('deleteBlog', data)
}
