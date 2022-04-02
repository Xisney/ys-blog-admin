import { NavGroup } from '@src/api/navgation'
import { debouce } from '@src/utils'
import { Form, Input, Avatar, Select, FormInstance, Button } from 'antd'
import { FC, MutableRefObject, useImperativeHandle, useState } from 'react'

interface NavItemFormProps {
  form: FormInstance<any>
  isAdd?: boolean
  selectOptions: Omit<NavGroup, 'count'>[]
  handleAddNav?: () => void
  addLoading?: boolean
  apisRef?: MutableRefObject<(data: string) => void>
}

const NavItemForm: FC<NavItemFormProps> = ({
  form,
  isAdd,
  selectOptions,
  handleAddNav,
  addLoading,
  apisRef,
}) => {
  const [iconSrc, setIconSrc] = useState('')
  const handleIconSrcChange = debouce((e: any) => {
    setIconSrc(e.target.value)
  })

  useImperativeHandle(apisRef, () => setIconSrc, [])

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
        name="iconUrl"
        label="图标地址"
        rules={[{ type: 'url', message: '输入的类型应为url' }]}
      >
        <Input
          onChange={handleIconSrcChange}
          addonBefore={
            <Avatar src={iconSrc || form.getFieldValue('iconUrl')} />
          }
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="描述"
        rules={[{ required: true, message: '请输入描述' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="url"
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
      <Form.Item
        name="navgationGroup"
        label="分组"
        rules={[
          {
            required: true,
            message: '请选择导航分组',
          },
        ]}
      >
        <Select
          fieldNames={{ label: 'label', value: 'id' }}
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          filterOption={(input, option) =>
            option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          options={selectOptions}
        />
      </Form.Item>
      {isAdd && (
        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            style={{ width: '40%' }}
            onClick={handleAddNav}
            loading={addLoading}
          >
            新建
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

export default NavItemForm
