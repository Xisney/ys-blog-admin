import { load as poemApi } from 'jinrishici'

interface PoemData {
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
