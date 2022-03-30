import { load as poemApi } from 'jinrishici'
import { httpPostJsonRequest, httpRequest } from '.'

export interface PoemData {
  content: string
  title: string
  dynasty: string
  author: string
}

export function getHomePoemData(): Promise<PoemData> {
  return new Promise((resolve, reject) => {
    poemApi(
      ({ data: { content, origin } }) => {
        resolve({
          content,
          title: origin.title,
          dynasty: origin.dynasty,
          author: origin.author,
        })
      },
      e => {
        reject({ message: e.errMessage })
      }
    )
  })
}

export function getBaseData() {
  return httpRequest('baseInfo')
}

export function updateNotice(value: { data: string }) {
  return httpPostJsonRequest('updateNotice', value)
}
