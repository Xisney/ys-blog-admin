import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://yapi.smart-xwork.cn/mock/137686/api/blog'

const apiInstance = axios.create({
  baseURL: 'http://localhost:3001/api/blog',
  timeout: 9000,
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
