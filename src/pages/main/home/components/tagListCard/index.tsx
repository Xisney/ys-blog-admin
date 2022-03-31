import { Card, Input, Button, Tag, Modal, message } from 'antd'
import { TagOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import style from './style.module.less'
import { FC, memo, useState } from 'react'
import { removeTag, updateTag } from '@src/api/common'

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
  id: number
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

  const [changeLoading, setChangeLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)

  const handleDeleteTag = (id: number, label: string) => {
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
          const {
            data: { code, data },
          } = await removeTag({ id })

          if (code === -1) throw data
          setTags(tags.filter(v => v.id !== id))
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

  const handleAddTag = async () => {
    if (isRepeatTag(newTagLabel)) {
      message.warning('标签名重复，新建失败！')
      return
    }
    if (newTagLabel === '') {
      message.warning('标签名为空，新建失败！')
      return
    }
    setCreateLoading(true)

    const {
      data: { data, code },
    } = await updateTag({ label: newTagLabel })

    if (code === -1) {
      message.error('服务异常，创建标签失败')
    } else {
      setTags([...tags, { label: newTagLabel, id: data }])
      message.success(`创建 ${newTagLabel} 成功`)
      setNewTagLabel('')
    }
    setCreateLoading(false)
  }

  const handleEditTag = async () => {
    if (!editTagInfo) return

    if (isRepeatTag(editTagInfo.label)) {
      message.warning('已存在该标签！')
      return
    }
    if (editTagInfo.label === '') {
      message.warning('请输入标签名！')
      return
    }
    setChangeLoading(true)

    const {
      data: { code },
    } = await updateTag(editTagInfo)

    if (code === -1) {
      message.error('服务异常，修改标签失败')
    } else {
      setTags(
        tags.map(({ label, id }) => {
          if (id === editTagInfo?.id) {
            return { id, label: editTagInfo.label }
          }

          return { label, id }
        })
      )
      message.success('修改标签成功')
      setEditModalVisible(false)
    }

    setChangeLoading(false)
  }

  return (
    <Card hoverable title="标签管理" className={style['home-tag-list-card']}>
      <Input.Group style={{ display: 'flex' }} compact>
        <Input
          prefix={<TagOutlined className="home-icon" />}
          value={newTagLabel}
          onChange={e => {
            setNewTagLabel(e.target.value.trim())
          }}
          onPressEnter={handleAddTag}
        />
        <Button type="primary" onClick={handleAddTag} loading={createLoading}>
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
        confirmLoading={changeLoading}
      >
        <Input
          value={editTagInfo?.label || ''}
          onChange={e => {
            setEditTagInfo({ ...editTagInfo!, label: e.target.value.trim() })
          }}
          onPressEnter={handleEditTag}
        />
      </Modal>
    </Card>
  )
}

export default memo(TagListCard)
