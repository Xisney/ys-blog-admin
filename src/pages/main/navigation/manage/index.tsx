import { useState } from 'react'
import { Form } from 'antd'
import GroupListCard from '../../home/components/groupListCard'
import NavItemForm from '../components/navItemForm'
import style from './style.module.less'

const Manage = () => {
  const [form] = Form.useForm()
  const [listGroup, setListGroup] = useState([
    { label: 'React', id: 1, num: 10 },
    { label: 'Typescript', id: 2, num: 5 },
  ])

  return (
    <div className={style['manage-container']}>
      <div className="manage-form-wrapper">
        <NavItemForm form={form} isAdd />
      </div>
      <GroupListCard
        data={listGroup}
        setData={setListGroup}
        className="manage-group-card"
        isNav
      />
    </div>
  )
}

export default Manage
