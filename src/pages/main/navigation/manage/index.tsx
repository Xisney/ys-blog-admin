import { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import GroupListCard from '../../home/components/groupListCard'
import NavItemForm from '../components/navItemForm'
import style from './style.module.less'
import Loading from '@src/components/loading'
import { getNavigationGroupData, NavGroup } from '@src/api/navgation'

const Manage = () => {
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()
  const [data, setNavData] = useState<NavGroup[]>()

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

  return loading ? (
    <Loading />
  ) : (
    <div className={style['manage-container']}>
      <div className="manage-form-wrapper">
        <NavItemForm
          form={form}
          isAdd
          selectOptions={data?.map(({ id, label }) => ({ id, label })) || []}
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
