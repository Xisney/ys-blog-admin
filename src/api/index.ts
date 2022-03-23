import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = ''

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 9000,
})

export function httpRequest(url: string, config?: AxiosRequestConfig) {
  return apiInstance(url, config)
}
