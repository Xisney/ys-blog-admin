import Loading from '@src/components/loading'
import { Card } from 'antd'
import style from './style.module.less'
import { getHomeGroupData, getHomePoemData } from '@src/api/home'
import useGetData from '@src/hooks/useGetData'
import { useState } from 'react'
import GroupPieChart from './components/groupPieChart'
import GroupListCard from './components/groupListCard'
import NoticeCard from './components/noticeCard'
import ShowCards from './components/showCards'
import WelcomeCard from './components/welcomeCard'
import TagListCard from './components/tagListCard'

const Home = () => {
  const [res, loading] = useGetData([getHomePoemData, getHomeGroupData])

  const [listGroup, setListGroup] = useState([
    { label: 'React', id: 1, num: 10 },
    { label: 'Typescript', id: 2, num: 5 },
  ])

  const [listTag, setListTag] = useState([
    { label: 'React', id: '1' },
    { label: 'Vue', id: '2' },
  ])

  return loading ? (
    <Loading />
  ) : (
    <div className={style['home-container']}>
      <div className="home-first-row">
        <WelcomeCard poemData={res[0]} />
        <NoticeCard originNotice="最近在写毕设" />
      </div>
      <ShowCards
        viewCount={300}
        blogNum={24}
        runDays={56}
        lastModify={1648109091930}
      />
      <div className="home-opt-row">
        <Card hoverable style={{ maxWidth: '45%', flex: 1 }}>
          <GroupPieChart data={res[1]?.groupData} />
        </Card>
        <GroupListCard data={listGroup} setData={setListGroup} />
        <TagListCard tags={listTag} setTags={setListTag} />
      </div>
    </div>
  )
}

export default Home
