import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  MessageOutlined,
  SendOutlined,
  NotificationOutlined,
} from '@ant-design/icons'
import style from './style.module.less'
import { Outlet, Link } from 'react-router-dom'

const { Header, Sider, Content, Footer } = Layout
const Main = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className={style['main-container']}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="main-logo">{`YS${collapsed ? '' : '后台管理'}`}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="">首页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileDoneOutlined />}>
            <Link to="blog">文章</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MessageOutlined />}>
            <Link to="comment">留言</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SendOutlined />}>
            <Link to="navigation">导航</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<NotificationOutlined />}>
            <Link to="about">关于</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FileTextOutlined />}>
            <Link to="draft">草稿</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="main-layout">
        <Header className="main-header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => {
                setCollapsed(!collapsed)
              },
            }
          )}
        </Header>
        <Content className="main-content">
          <Outlet />
        </Content>
        <Footer className="main-footer">
          Ys博客后台 &copy;2022 Created by Roy
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Main
