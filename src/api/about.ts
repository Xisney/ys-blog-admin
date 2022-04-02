import { httpPostJsonRequest, httpRequest } from '.'

export function getAboutContent() {
  return httpRequest('about')
}

export function updateAboutContent(data: { content: string }) {
  return httpPostJsonRequest('updateAbout', data)
}
