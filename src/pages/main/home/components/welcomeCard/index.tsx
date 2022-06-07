import { PoemData } from '@src/api/home'
import { Card } from 'antd'
import { FC, useCallback } from 'react'
import dayjs from 'dayjs'
import ysImg from '../../static/ys.png'
import style from './style.module.less'

interface WelcomeCardProps {
  poemData: PoemData
}

const WelcomeCard: FC<WelcomeCardProps> = ({
  poemData: { content, dynasty, author },
}) => {
  const renderWelcomeWord = useCallback(() => {
    const h = dayjs().hour()
    if (h >= 6 && h < 10)
      return (
        <>
          早上好欢迎你<span>YS</span>
        </>
      )
    if (h >= 10 && h < 14)
      return (
        <>
          中午好，小睡一会吧<span>YS</span>
        </>
      )
    if (h >= 14 && h < 18)
      return (
        <>
          下午好，站起来走走吧<span>YS</span>
        </>
      )
    if (h >= 18 && h < 22)
      return (
        <>
          晚上好，做一些自己喜欢的事情吧<span>YS</span>
        </>
      )
    if (h >= 22 || h < 6)
      return (
        <>
          夜深了，早点休息吧<span>YS</span>
        </>
      )
  }, [])

  return (
    <Card hoverable className={style['home-welcome-card']}>
      <div className="home-card-welcome-inner">
        <img src={ysImg} alt="avatar" />
        <div className="home-welcome-wrapper">
          <h2>{renderWelcomeWord()}</h2>
          {`${content} --${dynasty} · ${author}`}
        </div>
      </div>
    </Card>
  )
}

export default WelcomeCard
