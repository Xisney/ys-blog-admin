import Loading from '@src/components/loading'
import { Card } from 'antd'
import style from './style.module.less'
import { getBaseData, getHomePoemData } from '@src/api/home'
import useGetData from '@src/hooks/useGetData'
import { useEffect, useState } from 'react'
import GroupPieChart from './components/groupPieChart'
import GroupListCard from './components/groupListCard'
import NoticeCard from './components/noticeCard'
import ShowCards from './components/showCards'
import WelcomeCard from './components/welcomeCard'
import TagListCard from './components/tagListCard'
import { getGroupAndTags } from '@src/api/common'
import { TagAndGroupItem } from '@src/api/blog'

const Home = () => {
  const [res, loading] = useGetData([getHomePoemData, getBaseData])
  const [selfLoading, setSelfLoading] = useState(true)

  const [listGroup, setListGroup] = useState<TagAndGroupItem[]>()

  const [listTag, setListTag] = useState<TagAndGroupItem[]>()

  useEffect(() => {
    let mounted = true
    getGroupAndTags().then(({ data: { data } }) => {
      if (!mounted) return

      setListTag(data.tags)
      setListGroup(data.groups)
      setSelfLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return loading || selfLoading ? (
    <Loading />
  ) : (
    <div className={style['home-container']}>
      <div className="home-first-row">
        <WelcomeCard poemData={res[0]} />
        <NoticeCard originNotice={res[1].data.notice} />
      </div>
      <ShowCards
        viewCount={res[1].data.viewCount}
        blogNum={24}
        runDays={res[1].data.startTime}
        lastModify={res[1].data.lastModify}
      />
      <div className="home-opt-row">
        <Card hoverable style={{ maxWidth: '45%', flex: 1 }}>
          <GroupPieChart
            data={[
              { value: 20, name: '现代哲学' },
              { value: 31, name: 'React深入' },
              { value: 3, name: '现代前端构建工具' },
            ]}
          />
        </Card>
        <GroupListCard data={listGroup || []} setData={setListGroup} />
        <TagListCard tags={listTag || []} setTags={setListTag} />
      </div>
    </div>
  )
}

export default Home
