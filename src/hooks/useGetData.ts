import { useEffect, useState } from 'react'

interface GetData {
  (): Promise<any>
}

function useGetData(getData: GetData[]): [any, boolean] {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    Promise.all(getData.map(f => f()))
      .then(res => {
        if (mounted) setData(res)
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return [data, loading]
}

export default useGetData
