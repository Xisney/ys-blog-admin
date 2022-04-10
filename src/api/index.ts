import axios, { AxiosRequestConfig } from 'axios'

export const isDev = import.meta.env.DEV

const baseURL = isDev
  ? 'http://localhost:3001/api/blog'
  : 'http://47.107.76.201/api/blog'

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
