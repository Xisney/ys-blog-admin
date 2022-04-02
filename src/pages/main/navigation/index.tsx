import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  getNavigationData,
  NavItem,
  NavsData,
  removeNavigation,
  updateNavigation,
} from '@src/api/navgation'
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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavItemForm from './components/navItemForm'
import style from './style.module.less'

const { Meta } = Card
const { TabPane } = Tabs

const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const [res, setRes] = useState<NavsData[]>()
  const [confirmLoading, setConfirmLoading] = useState(false)

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

  const resetIconRef = useRef<(data: string) => void>(() => {})

  const handleDelete = async (id: number, pId: number) => {
    try {
      const {
        data: { code },
      } = await removeNavigation({ id })
      if (code === -1) throw '服务异常，删除失败'

      setRes(
        res?.map(nav => {
          if (nav.id === pId) {
            const items = nav.navItems.filter(({ id: cid }) => cid !== id)

            return {
              ...nav,
              navItems: items,
            }
          }

          return nav
        })
      )
      message.success('成功删除该导航')
    } catch (e) {
      message.error(e as string)
    }
  }

  const handleEdit = (n: NavItem, pId: number) => {
    setEditModalVisible(true)
    form.resetFields()
    resetIconRef.current('')
    form.setFields([
      {
        name: 'title',
        value: n.title,
      },
      {
        name: 'description',
        value: n.description,
      },
      {
        name: 'url',
        value: n.url,
      },
      {
        name: 'iconUrl',
        value: n.iconUrl,
      },
      {
        name: 'navgationGroup',
        value: pId,
      },
    ])
    editIdRef.current = { id: n.id, pId }
  }

  const editIdRef = useRef<Record<string, number>>()
  const handleSubmitEdit = async () => {
    if (editIdRef.current === undefined) {
      message.warning('id异常，请重试')
      return
    }

    const { id, pId } = editIdRef.current
    try {
      const value = await form.validateFields()

      setConfirmLoading(true)
      const {
        data: { code },
      } = await updateNavigation({ ...value, id })

      if (code === -1) {
        message.error('服务异常，更新失败')
        return
      }

      const newValue = {
        id,
        title: value.title,
        description: value.description,
        iconUrl: value.iconUrl,
        url: value.url,
      }

      if (value.navgationGroup !== pId) {
        setRes(
          res?.map(nav => {
            switch (nav.id) {
              case pId:
                const items = nav.navItems.filter(item => {
                  return item.id !== id
                })
                return {
                  ...nav,
                  navItems: items,
                }
              case value.navgationGroup:
                return { ...nav, navItems: [...nav.navItems, newValue] }
              default:
                return nav
            }
          })
        )
      } else {
        setRes(
          res?.map(nav => {
            if (nav.id === value.navgationGroup) {
              const items = nav.navItems.map(item => {
                if (item.id === id) {
                  return newValue
                }

                return item
              })

              return {
                ...nav,
                navItems: items,
              }
            }

            return nav
          })
        )
      }

      setConfirmLoading(false)
      setEditModalVisible(false)
      message.success('修改导航成功！')
    } catch {}
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
          <TabPane tab={v.label} key={i} className="navigation-tabpane">
            {v.navItems.length === 0 ? (
              <Empty style={{ gridColumn: '1 / 5' }} />
            ) : (
              v.navItems.map(n => (
                <Card
                  hoverable
                  key={n.id}
                  style={{ width: 300, marginBottom: 15, cursor: 'default' }}
                  actions={[
                    <EditOutlined
                      onClick={() => {
                        handleEdit(n, v.id)
                      }}
                    />,
                    <Popconfirm
                      title="确认删除该导航吗"
                      onConfirm={async () => {
                        await handleDelete(n.id, v.id)
                      }}
                    >
                      <DeleteOutlined />
                    </Popconfirm>,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={n.iconUrl} />}
                    title={
                      <a href={n.url} target="_blank">
                        {n.title}
                      </a>
                    }
                    description={n.description}
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
          setEditModalVisible(false)
        }}
        onOk={handleSubmitEdit}
        confirmLoading={confirmLoading}
      >
        <NavItemForm
          apisRef={resetIconRef}
          form={form}
          selectOptions={res?.map(({ id, label }) => ({ id, label })) || []}
        />
      </Modal>
    </div>
  )
}

export default Navigation
