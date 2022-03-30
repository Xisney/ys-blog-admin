import { useState } from 'react'
import { Select, Form, Input, Button, Space } from 'antd'

import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import 'bytemd/dist/index.css'
import style from './style.module.less'
import useGetData from '@src/hooks/useGetData'
import Loading from '@src/components/loading'
import MyEditor from './components'
import { getGroupAndTags, TagsAndGroupData } from '@src/api/common'

const Write = () => {
  const [res, loading]: [[TagsAndGroupData], boolean] = useGetData([
    getGroupAndTags,
  ])

  const [blogvalue, setBlogValue] = useState('')
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log(values)
    console.log(JSON.stringify(blogvalue))
  }

  const handleSave = async () => {
    try {
      const value = await form.validateFields()
      console.log(value)
    } catch (e) {}
  }

  return loading ? (
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
              <Button type="primary" danger htmlType="submit">
                发布
              </Button>
              <Button type="primary" onClick={handleSave}>
                暂存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <MyEditor value={blogvalue} onChange={setBlogValue} />
    </div>
  )
}

export default Write
