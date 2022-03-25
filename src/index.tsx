import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './style/base.less'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

dayjs.locale('zh-cn')

ReactDOM.render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>,
  document.querySelector('#root')
)
