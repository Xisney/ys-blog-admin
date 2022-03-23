import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './style/base.less'
import App from './App'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
)
