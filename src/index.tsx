import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './style/base.less'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import ErrorBoundary from './components/errorBoundary'
import { RecoilRoot } from 'recoil'

dayjs.locale('zh-cn')

ReactDOM.render(
  <Router>
    <ConfigProvider locale={zhCN}>
      {/* <ErrorBoundary> */}
      <RecoilRoot>
        <App />
      </RecoilRoot>
      {/* </ErrorBoundary> */}
    </ConfigProvider>
  </Router>,
  document.querySelector('#root')
)
