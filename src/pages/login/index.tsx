import style from './style.module.less'
import siderImg from './static/sider.png'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const Login = () => {
  const onFinish = (v: any) => {
    console.log(v)
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
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
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
              <Form.Item className="login-tips-area">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot">访客登录</a>
              </Form.Item>

              <Form.Item className="login-btn-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
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
