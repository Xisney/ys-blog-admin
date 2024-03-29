import { useEffect, useRef, useState } from 'react'
import {
  Select,
  Form,
  Input,
  Button,
  Space,
  message,
  Modal,
  Popconfirm,
} from 'antd'

import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import 'bytemd/dist/index.css'
import style from './style.module.less'
import useGetData from '@src/hooks/useGetData'
import Loading from '@src/components/loading'
import MyEditor from './components'
import { getGroupAndTags, TagsAndGroupData } from '@src/api/common'
import { getBlogContent, updateBlog } from '@src/api/write'
import { useLocation } from 'react-router-dom'
import { cacheBlog, clearCacheBlog, getBlogCache, targetKeys } from './utils'
import { useTipClose } from './hooks'

const { TextArea } = Input

const Write = () => {
  const [res, loading]: [[TagsAndGroupData], boolean, any] = useGetData([
    getGroupAndTags,
  ])
  const [selfLoading, setSelfLoading] = useState(true)
  const publishLockRef = useRef(false)

  const blogIdRef = useRef()
  const { state }: { state: any } = useLocation()

  const hasPubOrSaveRef = useRef(false)
  useEffect(() => {
    if (!state) {
      setSelfLoading(false)
      const cache = getBlogCache()
      if (cache) {
        form.setFields([
          { name: 'title', value: cache.title },
          {
            name: 'group',
            value: cache.group,
          },
          {
            name: 'tags',
            value: cache.tags,
          },
        ])
        setBlogValue(cache.content)
        SetDes({ content: cache.description, origin: cache.description })
      }
      return () => {
        if (!hasPubOrSaveRef.current) {
          cacheBlog({
            ...form.getFieldsValue(targetKeys),
            content: getBlogValueRef.current().blogvalue,
            description: getBlogValueRef.current().des,
          })
        }
      }
    }

    const id = state.id
    blogIdRef.current = id
    form.setFields([
      { name: 'title', value: state.title },
      {
        name: 'group',
        value: state.group.id,
      },
      {
        name: 'tags',
        value: state.tags.map((v: any) => v.id),
      },
    ])
    SetDes({ origin: state.description, content: state.description })

    getBlogContent({ id })
      .then(({ data: { code, data } }) => {
        if (code === -1) throw data

        setBlogValue(data)
      })
      .catch(e => {
        message.error('服务异常，获取文章内容失败', e)
      })
      .finally(() => {
        setSelfLoading(false)
      })
  }, [])

  useTipClose()

  const [blogvalue, setBlogValue] = useState('')
  const [form] = Form.useForm()

  const [desModalVisible, setDesModalVisible] = useState(false)
  const [des, SetDes] = useState({ origin: '', content: '' })

  const getBlogValueRef = useRef<any>()

  useEffect(() => {
    getBlogValueRef.current = () => {
      return { blogvalue, des: des.content }
    }
  }, [des, blogvalue])

  const changeData = async (value: any, isDraft: boolean) => {
    if (value.tags && value.tags.length > 3) {
      message.warning('标签至多选择三个，请重新选择标签')
      return
    }

    const publishLock = publishLockRef.current
    if (publishLock) {
      message.warning(`操作进行中，请勿重复操作`)
      return
    }

    publishLockRef.current = true
    const {
      data: { code, data },
    } = await updateBlog({
      title: value.title,
      group: value.group,
      tags: value.tags || [],
      description: des.content,
      content: blogvalue,
      isDraft,
      viewCount: state?.viewCount || 0,
      id: blogIdRef.current,
    })
    if (code === -1) {
      message.error('服务异常，发布文章失败')
    } else {
      blogIdRef.current = data
      message.success(`${isDraft ? '暂存' : '发布'}文章成功`)
      clearCacheBlog()
      hasPubOrSaveRef.current = true
    }
    publishLockRef.current = false
  }

  return loading || selfLoading ? (
    <Loading />
  ) : (
    <div className={style['write-container']}>
      <div className="write-options">
        <Form
          layout="inline"
          autoComplete="off"
          style={{ justifyContent: 'space-between' }}
          form={form}
        >
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '文章标题必填' }]}
            style={{ flex: 2 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="文章分组"
            name="group"
            rules={[{ required: true, message: '为文章选择一个分组吧' }]}
            style={{ flex: 1.5 }}
          >
            <Select
              showSearch
              placeholder="为文章选择分组"
              optionFilterProp="label"
              options={res[0].data.groups.map(({ label, id }) => ({
                label,
                id,
              }))}
              filterOption={(input, option: any) => {
                return option
                  ? option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  : false
              }}
              fieldNames={{ label: 'label', value: 'id' }}
            />
          </Form.Item>
          <Form.Item label="文章标签" name="tags" style={{ flex: 1.5 }}>
            <Select
              placeholder="为文章选择标签"
              mode="multiple"
              optionFilterProp="label"
              filterOption={(input, option: any) => {
                return option
                  ? option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  : false
              }}
              options={res[0].data.tags}
              fieldNames={{ label: 'label', value: 'id' }}
              maxTagCount="responsive"
            />
          </Form.Item>
          <Form.Item style={{ flex: 1 }}>
            <Space>
              <Popconfirm
                title={`确认${
                  blogIdRef.current === undefined ? '发布' : '修改并发布'
                }文章吗`}
                onConfirm={async () => {
                  try {
                    const value = await form.validateFields()
                    await changeData(value, false)
                  } catch (e) {}
                }}
              >
                <Button type="primary" danger>
                  发布
                </Button>
              </Popconfirm>
              <Popconfirm
                title={`确认${
                  blogIdRef.current === undefined ? '暂存' : '修改并暂存'
                }文章吗`}
                onConfirm={async () => {
                  try {
                    const value = await form.validateFields()
                    await changeData(value, true)
                  } catch {}
                }}
              >
                <Button type="primary">暂存</Button>
              </Popconfirm>
              <Button
                type="dashed"
                onClick={() => {
                  setDesModalVisible(true)
                }}
              >
                修改文章描述
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Modal
          title="修改文章描述"
          centered
          visible={desModalVisible}
          onCancel={() => {
            setDesModalVisible(false)
            SetDes({ ...des, content: des.origin })
          }}
          okText="确认修改"
          cancelText="取消"
          onOk={() => {
            SetDes({ ...des, origin: des.content })
            setDesModalVisible(false)
          }}
        >
          <TextArea
            className="modal-textArea"
            autoSize={{ minRows: 2, maxRows: 5 }}
            value={des.content}
            onChange={e => {
              SetDes({ ...des, content: e.target.value })
            }}
            showCount
            maxLength={120}
          />
        </Modal>
      </div>
      <MyEditor value={blogvalue} onChange={setBlogValue} />
    </div>
  )
}

export default Write
