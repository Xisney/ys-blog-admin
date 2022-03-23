import { useEffect, useState } from 'react'

function useGetData<T = any>(
  getData: () => Promise<T>
): [T | undefined, boolean] {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getData()
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
