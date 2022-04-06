import { httpPostJsonRequest, httpRequest } from '.'

export interface CommentData {
  code: number
  data: {
    id: number
    parentId: number
    content: string
    avatar: string
    nickname: string
    email: string
    homepage: string
    isAdmin: boolean
    publishTime: string
  }[]
}

export function getCommentData() {
  return httpRequest('/comment')
}

export function removeComment(data: { id: number }) {
  return httpPostJsonRequest('/removeComment', data)
}
