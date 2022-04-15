import axios, { AxiosRequestConfig } from 'axios'

export const isDev = import.meta.env.DEV

export const baseOrigin = isDev
  ? 'http://localhost:3001'
  : 'http://47.107.76.201'

export const baseURL = baseOrigin + '/api/blog'

const apiInstance = axios.create({
  baseURL,
  timeout: 9000,
  withCredentials: isDev,
})

export function httpRequest(url: string, config?: AxiosRequestConfig) {
  return apiInstance(url, config)
}

export function httpPostJsonRequest(url: string, data: any) {
  return apiInstance(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data,
  })
}

export function httpPostFileRequest(url: string, fd: FormData) {
  return apiInstance(url, {
    method: 'post',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 3 * 60 * 1000,
  })
}
