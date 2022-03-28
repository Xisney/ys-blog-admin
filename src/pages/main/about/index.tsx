import { Button, Modal, message } from 'antd'
import { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import MyEditor from '../write/components'

import style from './style.module.less'

const { confirm } = Modal

const About = () => {
  const [aboutData, setAboutData] = useState('')

  const handleUpdate = () => {
    confirm({
      title: `确认更新吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `内容将更新，请确认！`,
      centered: true,
      okType: 'danger',
      maskClosable: true,
      transitionName: '',
      onOk: async () => {
        try {
          await new Promise<void>(resolve => {
            setTimeout(() => {
              resolve()
            }, 2000)
          })
          message.success(`更新成功`)
        } catch (e) {
          message.error(`服务异常${e}`)
        }
      },
      onCancel() {},
    })
  }
  return (
    <div className={style['about-container']}>
      <Button
        danger
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleUpdate}
      >
        更新
      </Button>
      <MyEditor value={aboutData} onChange={setAboutData} />
    </div>
  )
}

export default About
