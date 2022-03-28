import { httpRequest } from '.'

export interface NavItem {
  id: string
  iconSrc: string
  itemTitle: string
  itemDes: string
  itemLink: string
}

export interface NavsData {
  id: string
  cardTitle: string
  navCardItems: NavItem[]
}

export function getNavigationData() {
  return httpRequest('/navigation')
}
