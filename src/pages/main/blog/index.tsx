import { getBlogListData, BlogListData } from '@src/api/blog'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import BlogTableList from '../components/BlogTableList'

const Blog = () => {
  const [res, loading]: [[BlogListData], boolean] = useGetData([
    getBlogListData,
  ])

  return loading ? <Loading /> : <BlogTableList data={res[0]} />
}

export default Blog
