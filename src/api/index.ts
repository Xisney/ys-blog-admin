import axios, { AxiosRequestConfig } from 'axios'

const apiInstance = axios.create({
  baseURL: 'http://47.107.76.201/api/blog',
  timeout: 9000,
  withCredentials: true,
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
