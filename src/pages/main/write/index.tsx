import { useEffect, useState } from 'react'
import { Select, Form, Input, Button, Space, message, Modal } from 'antd'

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

const { TextArea } = Input

const Write = () => {
  const [res, loading]: [[TagsAndGroupData], boolean] = useGetData([
    getGroupAndTags,
  ])
  const [selfLoading, setSelfLoading] = useState(true)
  const [isPublished, setIsPublished] = useState(false)

  const { state }: { state: any } = useLocation()
  useEffect(() => {
    if (!state) {
      setSelfLoading(false)
      return
    }

    const id = state.id
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

  const [blogvalue, setBlogValue] = useState('')
  const [form] = Form.useForm()

  const [pubLoading, setPubLoading] = useState(false)
  const [savaLoading, setSaveLoading] = useState(false)

  const [desModalVisible, setDesModalVisible] = useState(false)
  const [des, SetDes] = useState({ origin: '', content: '' })

  const changeData = async (value: any, isDraft: boolean) => {
    if (isPublished) {
      message.warning(`本文已${isDraft ? '保存' : '发布'}，无需重复操作`)
      return
    }

    const {
      data: { code },
    } = await updateBlog({
      ...value,
      description: des.content,
      content: blogvalue,
      isDraft,
      viewCount: 0,
    })
    if (code === -1) {
      message.error('服务异常，发布文章失败')
    } else {
      message.success(`${isDraft ? '暂存' : '发布'}文章成功`)
      setIsPublished(true)
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      setPubLoading(true)
      await changeData(values, false)
    } catch (e) {
    } finally {
      setPubLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const value = await form.validateFields()
      setSaveLoading(true)
      await changeData(value, true)
    } catch (e) {
    } finally {
      setSaveLoading(false)
    }
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
          onFinish={handleSubmit}
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
              options={res[0].data.groups}
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
              <Button
                type="primary"
                danger
                htmlType="submit"
                loading={pubLoading}
              >
                发布
              </Button>
              <Button type="primary" onClick={handleSave} loading={savaLoading}>
                暂存
              </Button>
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
