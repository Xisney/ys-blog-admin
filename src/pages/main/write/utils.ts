import { BlogData } from '@src/api/write'

type BlogCache = Partial<
  Pick<BlogData, 'title' | 'description' | 'content' | 'group' | 'tags'>
>

const key = 'blogCache'
export const targetKeys = ['title', 'description', 'content', 'group', 'tags']

export function cacheBlog(data: BlogCache) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function clearCacheBlog() {
  localStorage.removeItem(key)
}

export function getBlogCache() {
  return JSON.parse(localStorage.getItem(key) || 'null')
}
