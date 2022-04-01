import { useEffect, useState } from 'react'

interface GetData {
  (): Promise<any>
}

function useGetData(getData: GetData[]): [any, boolean, any] {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    Promise.all(getData.map(f => f()))
      .then(res => {
        if (mounted)
          setData(
            res.map(r => {
              return r.data ? r.data : r
            })
          )
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

  return [data, loading, setData]
}

export default useGetData
