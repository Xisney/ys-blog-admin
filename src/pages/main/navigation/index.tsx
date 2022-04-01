import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getNavigationData, NavItem, NavsData } from '@src/api/navgation'
import Loading from '@src/components/loading'
import {
  Card,
  Avatar,
  Tabs,
  Popconfirm,
  Form,
  Modal,
  Button,
  Empty,
  message,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavItemForm from './components/navItemForm'
import style from './style.module.less'

const { Meta } = Card
const { TabPane } = Tabs

const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const [res, setRes] = useState<NavsData[]>()

  useEffect(() => {
    getNavigationData()
      .then(({ data: { code, data } }) => {
        if (code === -1) throw '服务异常'
        setRes(data)
      })
      .catch(e => {
        message.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const navigate = useNavigate()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleDelete = (id: number) => {}

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
        {res.map((v, i) => (
          <TabPane tab={v.name} key={i} className="navigation-tabpane">
            {v.navItems.length === 0 ? (
              <Empty style={{ gridColumn: '1 / 5' }} />
            ) : (
              v.navItems.map(n => (
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
              ))
            )}
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
