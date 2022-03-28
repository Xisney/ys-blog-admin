import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getNavigationData, NavsData, NavItem } from '@src/api/navgation'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import { Card, Avatar, Tabs, Popconfirm, Form, Modal, Button } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavItemForm from './components/navItemForm'
import style from './style.module.less'

const { Meta } = Card
const { TabPane } = Tabs

const Navigation = () => {
  const [res, loading]: [[NavsData[]], boolean] = useGetData([
    getNavigationData,
  ])
  const navigate = useNavigate()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleDelete = (id: string) => {}

  const handleEdit = (n: NavItem) => {
    setEditModalVisible(true)
    form.resetFields()
    form.setFields([
      {
        name: 'title',
        value: n.itemTitle,
      },
      {
        name: 'description',
        value: n.itemDes,
      },
      {
        name: 'link',
        value: n.itemLink,
      },
      {
        name: 'iconSrc',
        value: n.iconSrc,
      },
      {
        name: 'group',
        value: '1',
      },
    ])
  }

  const renderTabs = useMemo(() => {
    if (!res) return ''

    return (
      <Tabs
        animated
        tabBarExtraContent={{
          left: (
            <Button
              style={{ marginRight: 16 }}
              onClick={() => {
                navigate('manage')
              }}
            >
              管理
            </Button>
          ),
        }}
      >
        {res[0].map((v, i) => (
          <TabPane tab={v.cardTitle} key={i} className="navigation-tabpane">
            {v.navCardItems.map(n => (
              <Card
                hoverable
                key={n.id}
                style={{ width: 300 }}
                actions={[
                  <EditOutlined
                    onClick={() => {
                      handleEdit(n)
                    }}
                  />,
                  <Popconfirm title="确认删除该导航吗">
                    <DeleteOutlined
                      onClick={() => {
                        handleDelete(n.id)
                      }}
                    />
                  </Popconfirm>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={n.iconSrc} />}
                  title={
                    <a href={n.itemLink} target="_blank">
                      {n.itemTitle}
                    </a>
                  }
                  description={n.itemDes}
                />
              </Card>
            ))}
          </TabPane>
        ))}
      </Tabs>
    )
  }, [res])

  return loading ? (
    <Loading />
  ) : (
    <div className={style['navigation-container']}>
      {renderTabs}
      <Modal
        visible={editModalVisible}
        title="修改导航项"
        okText="提交"
        cancelText="取消"
        onCancel={() => {
          // formIconRef.current?.setIconSrc('')
          setEditModalVisible(false)
        }}
      >
        <NavItemForm form={form} />
      </Modal>
    </div>
  )
}

export default Navigation
