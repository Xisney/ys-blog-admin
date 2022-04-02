import { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import GroupListCard from '../../home/components/groupListCard'
import NavItemForm from '../components/navItemForm'
import style from './style.module.less'
import Loading from '@src/components/loading'
import {
  getNavigationGroupData,
  NavGroup,
  updateNavigation,
} from '@src/api/navgation'

const Manage = () => {
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()
  const [data, setNavData] = useState<NavGroup[]>()
  const [addLoading, setAddLoading] = useState(false)

  useEffect(() => {
    getNavigationGroupData()
      .then(({ data: { code, data } }) => {
        if (code === -1) throw '服务异常'
        setNavData(data)
      })
      .catch(e => {
        message.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleAddNav = async () => {
    try {
      const value = await form.validateFields()
      const groupId = form.getFieldValue('navgationGroup')
      setAddLoading(true)
      const {
        data: { code },
      } = await updateNavigation({ ...value })

      if (code === -1) {
        message.error('服务异常，创建失败')
        return
      }

      message.success('创建导航成功')
      setNavData(
        data?.map(d => {
          if (d.id === groupId) {
            return {
              ...d,
              count: d.count + 1,
            }
          }
          return d
        })
      )
    } catch {
    } finally {
      setAddLoading(false)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <div className={style['manage-container']}>
      <div className="manage-form-wrapper">
        <NavItemForm
          form={form}
          isAdd
          selectOptions={data?.map(({ id, label }) => ({ id, label })) || []}
          handleAddNav={handleAddNav}
          addLoading={addLoading}
        />
      </div>
      <GroupListCard
        data={
          data?.map(({ id, label, count }) => ({
            id,
            label,
            blogNum: count,
          })) || []
        }
        setData={items => {
          setNavData(
            items.map(({ id, label, blogNum }) => ({
              id,
              label,
              count: blogNum,
            }))
          )
        }}
        className="manage-group-card"
        isNav
      />
    </div>
  )
}

export default Manage
