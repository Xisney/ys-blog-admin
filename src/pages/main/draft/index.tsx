import { getDraftList, BlogListData } from '@src/api/draft'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import BlogTableList from '../components/BlogTableList'

const Draft = () => {
  const [res, loading, setData]: [[BlogListData], boolean, any] = useGetData([
    getDraftList,
  ])

  return loading ? (
    <Loading />
  ) : (
    <BlogTableList data={res[0]} isDraft setData={setData} />
  )
}

export default Draft
