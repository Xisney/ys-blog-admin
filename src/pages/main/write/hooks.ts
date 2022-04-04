import { useEffect } from 'react'

export function useTipClose() {
  useEffect(() => {
    const beforeunload = (e: any) => {
      const confirmationMessage = '确定离开此页吗？本页不需要刷新或后退'
      ;(e || window.event).returnValue = confirmationMessage // Gecko and Trident
      return confirmationMessage // Gecko and WebKit
    }
    window.addEventListener('beforeunload', beforeunload)

    return () => {
      window.removeEventListener('beforeunload', beforeunload)
    }
  }, [])
}
