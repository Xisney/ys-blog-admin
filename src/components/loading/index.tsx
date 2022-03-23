import { ReactComponent as LoadingIcon } from './static/loading.svg'
import style from './style.module.less'

const Loading = () => {
  return (
    <div className={style['loading-container']}>
      <LoadingIcon className="loading-icon" />
    </div>
  )
}

export default Loading
