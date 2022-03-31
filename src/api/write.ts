import { httpRequest, httpPostJsonRequest } from '.'

interface blogData {
  id?: number
  title: string
  content: string
  description: string
  isDraft: boolean
  viewCount: number
  group: number
  tags: number[]
}

export function updateBlog(data: blogData) {
  return httpPostJsonRequest('updateBlog', data)
}

export function getBlogContent(data: { id: number }) {
  return httpPostJsonRequest('blogContent', data)
}
