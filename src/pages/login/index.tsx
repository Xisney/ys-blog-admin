import style from './style.module.less'
import siderImg from './static/sider.png'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@src/api/login'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (v: any) => {
    setLoading(true)
    const {
      data: { code },
    } = await login(v)

    if (code === -1) {
      message.error('用户名密码异常，登录失败！')
      setLoading(false)
      return
    }

    navigate('/')
  }
  return (
    <div className={style['login-container']}>
      <div className="login-card">
        <div className="login-form">
          <div className="login-title">
            <h3>博客后台登录</h3>
          </div>
          <div className="login-input">
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="psw"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              {/* <Form.Item className="login-tips-area">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot">访客登录</a>
              </Form.Item> */}

              <Form.Item className="login-btn-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <img src={siderImg} alt="" />
      </div>
    </div>
  )
}

export default Login
