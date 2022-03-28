import { debouce } from '@src/utils'
import { Form, Input, Avatar, Select, FormInstance, Button } from 'antd'
import { FC, useState } from 'react'

interface NavItemFormProps {
  form: FormInstance<any>
  isAdd?: boolean
}

const NavItemForm: FC<NavItemFormProps> = ({ form, isAdd }) => {
  const [iconSrc, setIconSrc] = useState('')
  const handleIconSrcChange = debouce((e: any) => {
    setIconSrc(e.target.value)
  })

  return (
    <Form layout="vertical" form={form} autoComplete="off">
      <Form.Item
        name="title"
        label="导航名称"
        rules={[
          {
            required: true,
            message: '请输入导航名称',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="iconSrc"
        label="图标地址"
        rules={[{ type: 'url', message: '输入的类型应为url' }]}
      >
        <Input
          onChange={handleIconSrcChange}
          addonBefore={
            <Avatar src={iconSrc || form.getFieldValue('iconSrc')} />
          }
        />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input />
      </Form.Item>
      <Form.Item
        name="link"
        label="链接位置"
        rules={[
          {
            required: true,
            type: 'url',
            message: '请输入Url',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="group" label="分组">
        <Select
          fieldNames={{ label: 'label', value: 'id' }}
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          filterOption={(input, option) =>
            option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          options={[
            {
              label: 's',
              id: '1',
            },
            { label: 'f', id: '2' },
          ]}
        />
      </Form.Item>
      {isAdd && (
        <Form.Item style={{ textAlign: 'center' }}>
          <Button htmlType="submit" type="primary" style={{ width: '40%' }}>
            新建
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

export default NavItemForm
