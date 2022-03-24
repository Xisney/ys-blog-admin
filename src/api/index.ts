import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://yapi.smart-xwork.cn/mock/137686/api/blog'

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 9000,
})

export function httpRequest(url: string, config?: AxiosRequestConfig) {
  return apiInstance(url, config)
}
