import { FC, useState } from 'react'
import { List, Input, message, Card, Button, Modal } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  GroupOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

import style from './style.module.less'

interface ListItem {
  label: string
  id: number
  num: number
}

interface GroupListProps {
  data: ListItem[]
  setData: (data: ListItem[]) => void
}

const { confirm } = Modal

const GroupListCard: FC<GroupListProps> = ({ data, setData }) => {
  const [newGroupLabel, setNewGroupLabel] = useState('')
  const [editGroupIndex, setEditGroupIndex] = useState(-1)

  const isGroupRepeat = (newLabel: string) => {
    return data.findIndex(v => v.label === newLabel) !== -1
  }

  const handleAddGroup = () => {
    if (isGroupRepeat(newGroupLabel)) {
      message.warning('分组名重复，新建分组失败！')
      return
    }

    if (newGroupLabel.trim() === '') {
      message.warning('请输入分组名！')
      return
    }

    setData([
      ...data,
      {
        label: newGroupLabel,
        id: data[data.length - 1] ? data[data.length - 1].id + 1 : 1,
        num: 0,
      },
    ])
    message.success('新建分组成功！')
    setNewGroupLabel('')
  }

  const handleEditGroup = (e: any, id: number) => {
    const newGroupLabel = e.target.value
    if (isGroupRepeat(newGroupLabel)) {
      message.warning('分组名重复，修改分组失败！')
      setEditGroupIndex(-1)
      return
    }

    setData(
      data.map(v => {
        if (v.id === id) {
          return {
            ...v,
            label: newGroupLabel,
          }
        }
        return v
      })
    )
    message.success('修改标签成功！')
    setEditGroupIndex(-1)
  }

  const handleDeleteGroup = (id: number, label: string) => {
    confirm({
      title: `确认删除 ${label} 分组吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '删除时请确保该分组下没有文章，否则将拒绝删除',
      centered: true,
      okType: 'danger',
      maskClosable: true,
      transitionName: '',
      onOk: async () => {
        try {
          await new Promise<void>(resolve => {
            setTimeout(() => {
              setData(
                data.filter(d => {
                  return d.id !== id
                })
              )
              resolve()
            }, 2000)
          })
          message.success(`成功删除 ${label} 分组`)
        } catch (e) {
          message.error(`服务异常${e}`)
        }
      },
      onCancel() {},
    })
  }

  return (
    <Card hoverable title="分组管理" className={style['home-group-list-card']}>
      <Input.Group style={{ display: 'flex' }} compact>
        <Input
          prefix={<GroupOutlined className="home-icon" />}
          onPressEnter={handleAddGroup}
          value={newGroupLabel}
          onChange={e => {
            setNewGroupLabel(e.target.value.trim())
          }}
        />
        <Button type="primary" onClick={handleAddGroup}>
          新建分组
        </Button>
      </Input.Group>
      <List
        className="home-group-list"
        dataSource={data}
        rowKey="id"
        renderItem={({ id, num, label }, i) => {
          return (
            <List.Item className="home-list-item">
              <div className="home-list-text">
                <span className="home-list-num">{num}</span>
                {editGroupIndex === i ? (
                  <Input
                    onBlur={e => {
                      handleEditGroup(e, id)
                    }}
                    onPressEnter={e => {
                      handleEditGroup(e, id)
                    }}
                    defaultValue={label}
                    autoFocus
                  />
                ) : (
                  <span className="home-list-label">{label}</span>
                )}
              </div>
              <div className="home-list-icon-area">
                <EditOutlined
                  className="home-opt-icon"
                  onClick={() => {
                    setEditGroupIndex(i)
                  }}
                />
                <DeleteOutlined
                  className="home-opt-icon"
                  onClick={() => {
                    handleDeleteGroup(id, label)
                  }}
                />
              </div>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}

export default GroupListCard
