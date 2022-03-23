import Loading from '@src/components/loading'
import { Card, Modal, Input } from 'antd'
import style from './style.module.less'
import { getHomePoemData } from '@src/api/home'
import useGetData from '@src/hooks/useGetData'
import { EditOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'

const { TextArea } = Input

const Home = () => {
  const [res, loading] = useGetData(getHomePoemData)
  const [editNoticeVisible, setEditNoticeVisible] = useState(false)
  const [notice, setNotice] = useState('公告内容测试')
  const noticeTextRef = useRef<any>()

  return loading ? (
    <Loading />
  ) : (
    <div className={style['home-container']}>
      <div className="home-first-row">
        <Card hoverable className="home-card-welcome">
          <div className="home-card-welcome-inner">
            <img src="/ys.png" alt="avatar" />
            <div className="home-welcome-wrapper">
              <h2>
                下午好，欢迎你 <span>YS</span>
              </h2>
              {`${res?.content} --${res?.dynasty} · ${res?.author}`}
            </div>
          </div>
        </Card>
        <Card
          className="home-card-notice"
          title="公告"
          hoverable
          extra={
            <EditOutlined
              className="home-notice-edit"
              onClick={() => {
                setEditNoticeVisible(true)
              }}
            />
          }
        >
          <h2>{notice}</h2>
          <Modal
            title="修改公告"
            centered
            visible={editNoticeVisible}
            onCancel={() => {
              setEditNoticeVisible(false)
            }}
            okText="确认修改"
            cancelText="取消"
            onOk={() => {
              console.log(noticeTextRef.current.resizableTextArea.props.value)

              setEditNoticeVisible(
                noticeTextRef.current.resizableTextArea.props.value
              )
              setEditNoticeVisible(false)
            }}
          >
            <TextArea
              className="home-notice-modal"
              defaultValue={notice}
              autoSize={{ minRows: 2, maxRows: 5 }}
              ref={noticeTextRef}
            />
          </Modal>
        </Card>
      </div>
      <div className="home-row">
        <Card className="home-card-show" title="总浏览量" hoverable>
          <h2 className="home-number-box">300</h2>
        </Card>
        <Card className="home-card-show" title="文章数" hoverable>
          <h2 className="home-number-box">20</h2>
        </Card>
        <Card className="home-card-show" title="运行时间" hoverable>
          <h2 className="home-number-box">20</h2>
        </Card>
        <Card className="home-card-show" title="距离上次活动" hoverable>
          <h2 className="home-number-box">30</h2>
        </Card>
      </div>
    </div>
  )
}

export default Home
