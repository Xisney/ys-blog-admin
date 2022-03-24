import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './style/base.less'
import App from './App'

import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

dayjs.locale('zh-cn')

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
)
