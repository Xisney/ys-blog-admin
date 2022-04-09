import { Component } from 'react'
import { Result } from 'antd'
import style from './style.module.less'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? (
      <Result
        status="warning"
        title="发生错误，请联系管理员"
        className={style['errorBoundary-container']}
      />
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
