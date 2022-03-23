import style from './style.module.less'
import notFoundImg from './static/404.jpg'

const NotFound = () => {
  return (
    <div className={style['notFound-wrapper']}>
      <img src={notFoundImg} alt="" />
    </div>
  )
}

export default NotFound
