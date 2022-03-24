import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Card } from 'antd'
import style from './style.module.less'
import { FC } from 'react'

dayjs.extend(relativeTime)

interface ShowCardsProps {
  viewCount: number
  blogNum: number
  runDays: number
  lastModify: number
}

const ShowCards: FC<ShowCardsProps> = ({
  viewCount,
  blogNum,
  runDays,
  lastModify,
}) => {
  return (
    <div className={style['home-show-cards']}>
      <Card className="home-card-show" title="总浏览量(次)" hoverable>
        <h2 className="home-number-box">{viewCount}</h2>
      </Card>
      <Card className="home-card-show" title="文章数(篇)" hoverable>
        <h2 className="home-number-box">{blogNum}</h2>
      </Card>
      <Card className="home-card-show" title="运行时间(天)" hoverable>
        <h2 className="home-number-box">{runDays}</h2>
      </Card>
      <Card className="home-card-show" title="上次活动时间" hoverable>
        <h2 className="home-number-box">{dayjs(lastModify).fromNow()}</h2>
      </Card>
    </div>
  )
}

export default ShowCards
