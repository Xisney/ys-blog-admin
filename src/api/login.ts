import { httpPostJsonRequest, httpRequest } from '.'

export function login(data: { email: string; psw: string }) {
  return httpPostJsonRequest('login', data)
}

export function exit() {
  return httpRequest('exit')
}

export function isLoginFn() {
  return httpRequest('isLogin')
}
