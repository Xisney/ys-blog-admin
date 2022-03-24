import { Card, Input, Button, List } from 'antd'
import { TagOutlined } from '@ant-design/icons'
import style from './style.module.less'

const TagListCard = () => {
  return (
    <Card hoverable title="标签管理" className={style['home-tag-list-card']}>
      <Input.Group style={{ display: 'flex' }} compact>
        <Input prefix={<TagOutlined className="home-icon" />} />
        <Button type="primary">新建标签</Button>
      </Input.Group>
      <List></List>
    </Card>
  )
}

export default TagListCard
