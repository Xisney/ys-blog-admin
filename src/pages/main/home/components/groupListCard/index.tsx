import { FC, useState } from 'react'
import { List, Input, message, Card, Button, Modal } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  GroupOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import cx from 'classnames'

import style from './style.module.less'
import { removeGroup, updateGroup } from '@src/api/common'
import {
  removeNavigationGroupData,
  updateNavigationGroupData,
} from '@src/api/navgation'

interface ListItem {
  label: string
  id: number
  blogNum: number
}

interface GroupListProps {
  data: ListItem[]
  setData: (data: ListItem[]) => void
  className?: string
  isNav?: boolean
}

const { confirm } = Modal

const changeMesKey = 'homeGroupChange'

const GroupListCard: FC<GroupListProps> = ({
  data,
  setData,
  className,
  isNav,
}) => {
  const [newGroupLabel, setNewGroupLabel] = useState('')
  const [editGroupIndex, setEditGroupIndex] = useState(-1)

  const [createLoading, setCreateLoading] = useState(false)

  const isGroupRepeat = (newLabel: string) => {
    return data.findIndex(v => v.label === newLabel) !== -1
  }

  const handleAddGroup = async () => {
    if (isGroupRepeat(newGroupLabel)) {
      message.warning('分组名重复，新建分组失败！')
      return
    }

    if (newGroupLabel.trim() === '') {
      message.warning('请输入分组名！')
      return
    }

    setCreateLoading(true)
    const {
      data: { code, newId },
    } = await (isNav
      ? updateNavigationGroupData({ label: newGroupLabel })
      : updateGroup({ label: newGroupLabel }))

    if (code === -1) {
      message.error('服务异常，新建分组失败')
    } else {
      setData([
        ...data,
        {
          label: newGroupLabel,
          id: newId,
          blogNum: 0,
        },
      ])
      message.success('新建分组成功！')
      setNewGroupLabel('')
    }
    setCreateLoading(false)
  }

  const handleEditGroup = async (e: any, id: number) => {
    const newGroupLabel = e.target.value
    if (isGroupRepeat(newGroupLabel)) {
      message.warning('分组名重复，修改分组失败！')
      setEditGroupIndex(-1)
      return
    }

    message.loading({ content: '修改中...', key: changeMesKey })

    const {
      data: { code },
    } = await (isNav
      ? updateNavigationGroupData({ id, label: newGroupLabel })
      : updateGroup({ id, label: newGroupLabel }))

    if (code === -1) {
      message.error({ content: '服务异常，修改分组失败', key: changeMesKey })
    } else {
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
      message.success({ content: '修改分组成功！', key: changeMesKey })
    }
    setEditGroupIndex(-1)
  }

  const handleDeleteGroup = (id: number, label: string) => {
    confirm({
      title: `确认删除 ${label} 分组吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除时请确保该分组下没有 ${
        isNav ? 'item' : '文章'
      }，否则将拒绝删除`,
      centered: true,
      okType: 'danger',
      maskClosable: true,
      transitionName: '',
      onOk: async () => {
        try {
          const {
            data: { code },
          } = await (isNav
            ? removeNavigationGroupData({ id })
            : removeGroup({ id }))
          if (code === -1) throw ' 删除分组失败'

          setData(
            data.filter(d => {
              return d.id !== id
            })
          )
          message.success(`成功删除 ${label} 分组`)
        } catch (e) {
          message.error(`服务异常${e}`)
        }
      },
      onCancel() {},
    })
  }

  return (
    <Card
      hoverable
      title={isNav ? '导航分组管理' : '分组管理'}
      className={cx(style['home-group-list-card'], className)}
    >
      <Input.Group style={{ display: 'flex' }} compact>
        <Input
          prefix={<GroupOutlined className="home-icon" />}
          onPressEnter={handleAddGroup}
          value={newGroupLabel}
          onChange={e => {
            setNewGroupLabel(e.target.value.trim())
          }}
        />
        <Button type="primary" onClick={handleAddGroup} loading={createLoading}>
          新建分组
        </Button>
      </Input.Group>
      <List
        className="home-group-list"
        dataSource={data}
        rowKey="id"
        renderItem={({ id, blogNum, label }, i) => {
          return (
            <List.Item className="home-list-item">
              <div className="home-list-text">
                <span className="home-list-num">{blogNum}</span>
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
