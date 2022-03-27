import { getDraftList, BlogListData } from '@src/api/draft'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import BlogTableList from '../components/BlogTableList'

const Draft = () => {
  const [res, loading]: [[BlogListData], boolean] = useGetData([getDraftList])

  return loading ? <Loading /> : <BlogTableList data={res[0]} isDraft />
}

export default Draft
