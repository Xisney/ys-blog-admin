import { useState, FC } from 'react'
import { Card, Modal, Input } from 'antd'
import style from './style.module.less'
import { EditOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface NoticeCardProps {
  originNotice: string
}

const NoticeCard: FC<NoticeCardProps> = ({ originNotice }) => {
  const [editNoticeVisible, setEditNoticeVisible] = useState(false)
  const [notice, setNotice] = useState(originNotice)
  const [noticeText, setNoticeText] = useState(notice)

  return (
    <Card
      className={style['home-card-notice']}
      title="公告"
      hoverable
      extra={
        <EditOutlined
          className="home-opt-icon"
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
          setNotice(noticeText)
          setEditNoticeVisible(false)
        }}
      >
        <TextArea
          className="home-notice-modal-textArea"
          defaultValue={notice}
          autoSize={{ minRows: 2, maxRows: 5 }}
          value={noticeText}
          onChange={e => {
            setNoticeText(e.target.value)
          }}
        />
      </Modal>
    </Card>
  )
}

export default NoticeCard
