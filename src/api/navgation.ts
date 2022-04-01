import { httpPostJsonRequest, httpRequest } from '.'

export interface NavItem {
  id: number
  iconSrc: string
  itemTitle: string
  itemDes: string
  itemLink: string
}

export interface NavsData {
  id: number
  name: string
  navItems: NavItem[]
}

export interface NavGroup {
  id: number
  label: string
  count: number
}

export function getNavigationData() {
  return httpRequest('/navigation')
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
