import { httpPostJsonRequest, httpRequest } from '.'

export interface NavItem {
  id: number
  iconUrl: string
  title: string
  description: string
  url: string
}

export interface NavsData {
  id: number
  label: string
  navItems: NavItem[]
}

export interface NavGroup {
  id: number
  label: string
  count: number
}

interface UpdateNavData {
  id?: number
  iconUrl: string
  title: string
  description: string
  url: string
  navgationGroup: number
}

export function getNavigationData() {
  return httpRequest('/navigation')
}

export function updateNavigation(data: UpdateNavData) {
  return httpPostJsonRequest('updateNav', data)
}

export function removeNavigation(data: { id: number }) {
  return httpPostJsonRequest('removeNav', data)
}

export function getNavigationGroupData() {
  return httpRequest('navigationGroup')
}

export function updateNavigationGroupData(data: {
  label: string
  id?: number
}) {
  return httpPostJsonRequest('updateNavGroup', data)
}

export function removeNavigationGroupData(data: { id: number }) {
  return httpPostJsonRequest('removeNavGroup', data)
}
