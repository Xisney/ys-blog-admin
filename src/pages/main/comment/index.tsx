import { getCommentData, CommentData, removeComment } from '@src/api/comment'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import { message, Popconfirm, Space, Table } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { prodClientUrl } from '../consts'

import style from './style.module.less'
import { publishTimeCmp } from './utils'

const Comment = () => {
  const [res, loading, setData]: [[CommentData], boolean, any] = useGetData([
    getCommentData,
  ])

  const commentData = useMemo(() => {
    if (!res) return []

    const originCommentList = res[0].data
    return originCommentList
      .filter(c => c.parentId === 0)
      .map(p => {
        const children = originCommentList.filter(
          ({ parentId }) => parentId === p.id
        )
        return children.length === 0
          ? { ...p }
          : {
              ...p,
              children: children.sort(publishTimeCmp),
            }
      })
      .sort(publishTimeCmp)
  }, [res])

  const handleRemoveComment = async (id: number) => {
    message.loading({ content: '操作中...', key: 'removeComment', duration: 0 })
    const {
      data: { code },
    } = await removeComment({ id })

    if (code === -1) {
      message.error({ content: '服务异常，删除失败', key: 'removeComment' })
      return
    }

    setData([{ data: res[0].data.filter(v => v.id !== id) }])

    message.success({ content: '删除成功', key: 'removeComment' })
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 250,
      render(v: string, r: any) {
        const hompage = r.homepage
        const showName = r.isAdmin ? `${v}(站长)` : v
        return hompage ? <a href={hompage}>{showName}</a> : showName
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 240,
    },
    {
      title: '发布日期',
      dataIndex: 'publishTime',
      render(v: number) {
        return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
      },
      width: 210,
      sortDirections: ['ascend'],
      sorter: (a: any, b: any) =>
        new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime(),
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '操作',
      key: 'opt',
      render(_: any, r: any) {
        return (
          <Space size="middle" className="table-opts">
            <a href={prodClientUrl + 'comment'} target="_blank">
              查看
            </a>
            <Popconfirm
              title="确认删除该留言和所有回复吗？"
              onConfirm={() => {
                handleRemoveComment(r.id)
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        )
      },
      width: 200,
    },
  ]

  return loading ? (
    <Loading />
  ) : (
    <div className={style['comment-container']}>
      {/* @ts-ignore */}
      <Table columns={columns} dataSource={commentData} rowKey="id" bordered />
    </div>
  )
}

export default Comment
