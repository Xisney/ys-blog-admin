import { Card, Input, Button, Tag, Modal, message } from 'antd'
import { TagOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import style from './style.module.less'
import { FC, memo, useState } from 'react'

const presetColor = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
]
const colorCount = presetColor.length

interface Tag {
  label: string
  id: string
}
interface TagListCardProps {
  tags: Tag[]
  setTags: (data: Tag[]) => void
}

const { confirm } = Modal

const TagListCard: FC<TagListCardProps> = ({ tags, setTags }) => {
  const [newTagLabel, setNewTagLabel] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editTagInfo, setEditTagInfo] = useState<Tag>()

  const handleDeleteTag = (id: string, label: string) => {
    confirm({
      title: `确认删除 ${label} 标签吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '关联该标签的文章将失去该标签',
      centered: true,
      okType: 'danger',
      maskClosable: true,
      transitionName: '',
      onOk: async () => {
        try {
          await new Promise<void>(resolve => {
            setTimeout(() => {
              setTags(
                tags.filter(d => {
                  return d.id !== id
                })
              )
              resolve()
            }, 2000)
          })
          message.success(`成功删除 ${label} 标签`)
        } catch (e) {
          message.error(`服务异常${e}`)
        }
      },
      onCancel() {},
    })
  }

  const isRepeatTag = (label: string) => {
    return tags.findIndex(v => v.label === label) !== -1
  }

  const handleAddTag = () => {
    if (isRepeatTag(newTagLabel)) {
      message.warning('标签名重复，新建失败！')
      return
    }

    setTags([
      ...tags,
      { label: newTagLabel, id: +tags[tags.length - 1].id + 1 + '' },
    ])
    message.success(`创建 ${newTagLabel} 成功`)
    setNewTagLabel('')
  }

  const handleEditTag = () => {
    if (isRepeatTag(editTagInfo!.label)) {
      message.warning('已存在该标签！')
      return
    }

    setTags(
      tags.map(({ label, id }) => {
        if (id === editTagInfo?.id) {
          return { id, label: editTagInfo.label }
        }

        return { label, id }
      })
    )
    setEditModalVisible(false)
    message.success('修改标签成功')
  }

  return (
    <Card hoverable title="标签管理" className={style['home-tag-list-card']}>
      <Input.Group style={{ display: 'flex' }} compact>
        <Input
          prefix={<TagOutlined className="home-icon" />}
          value={newTagLabel}
          onChange={e => {
            setNewTagLabel(e.target.value)
          }}
          onPressEnter={handleAddTag}
        />
        <Button type="primary" onClick={handleAddTag}>
          新建标签
        </Button>
      </Input.Group>
      <div className="home-tag-wrapper">
        {tags.map(({ label, id }, i) => {
          return (
            <Tag
              key={id}
              color={presetColor[i % colorCount]}
              closable
              visible
              className="home-tag-item"
              onClose={() => {
                handleDeleteTag(id, label)
              }}
              onDoubleClick={() => {
                setEditModalVisible(true)
                setEditTagInfo({ label, id })
              }}
            >
              {label}
            </Tag>
          )
        })}
      </div>
      <Modal
        title="修改分组"
        visible={editModalVisible}
        centered
        onCancel={() => {
          setEditModalVisible(false)
        }}
        onOk={handleEditTag}
        transitionName=""
      >
        <Input
          value={editTagInfo?.label || ''}
          onChange={e => {
            setEditTagInfo({ ...editTagInfo!, label: e.target.value })
          }}
          onPressEnter={handleEditTag}
        />
      </Modal>
    </Card>
  )
}

export default memo(TagListCard)
