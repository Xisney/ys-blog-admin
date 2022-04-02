import { Button, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import MyEditor from '../write/components'

import style from './style.module.less'
import { getAboutContent, updateAboutContent } from '@src/api/about'
import Loading from '@src/components/loading'

const { confirm } = Modal

const About = () => {
  const [aboutData, setAboutData] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAboutContent()
      .then(({ data: { code, data } }) => {
        if (code === -1) throw '服务异常'
        setAboutData(data)
      })
      .catch(e => {
        message.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
          const {
            data: { code },
          } = await updateAboutContent({ content: aboutData })
          if (code === -1) {
            message.error('服务异常，更新失败')
          } else {
            message.success(`更新成功`)
          }
        } catch (e) {
          message.error(`服务异常${e}`)
        }
      },
      onCancel() {},
    })
  }
  return loading ? (
    <Loading />
  ) : (
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
