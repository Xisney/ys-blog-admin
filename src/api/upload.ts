import {
  baseOrigin,
  baseURL,
  httpPostFileRequest,
  httpPostJsonRequest,
  httpRequest,
} from '.'

export const uploadAction = baseURL + '/upload'

export function getAccessFileUrl(name: string) {
  return `${baseOrigin}/uploads/${name}`
}

export function getFiles() {
  return httpRequest('files')
}

export function removeFile(data: { name: string }) {
  return httpPostJsonRequest('deleteFile', data)
}

export function uploadFile(file: File) {
  const fd = new FormData()
  fd.append('file', file)

  return httpPostFileRequest('upload', fd)
}
