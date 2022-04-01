import { getCommentData, CommentData } from '@src/api/comment'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import { Popconfirm, Space, Table } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import style from './style.module.less'

const testData = [
  {
    id: '1',
    parentId: '',
    content: '发动机卡达开发',
    creator: {
      avatar: '',
      nickname: 'sfdsf',
      mail: '233423@qq.com',
      homePage: 'sdfsfa',
      isAdmin: false,
    },
    publishTime: 1647782010946,
  },
  {
    id: '4',
    parentId: '1',
    content: '发动机卡达开发发动机卡zheshi4',
    creator: {
      avatar: '',
      nickname: 'sfdsf',
      mail: '233423@qq.com',
      homePage: 'sdfsfa',
      isAdmin: true,
    },
    publishTime: 1647502010946,
  },
  {
    id: '2',
    parentId: '1',
    content: '发动机卡达开发发动机卡达开发发动机卡达开发发动机卡达开发',
    creator: {
      avatar: '',
      nickname: 'sfdsf',
      mail: '233423@qq.com',
      homePage: 'sdfsfa',
      isAdmin: true,
    },
    publishTime: 1647702010946,
  },
  {
    id: '3',
    parentId: '',
    content: '发动机卡达开发',
    creator: {
      avatar: '',
      nickname: 'sfdsf',
      mail: '233423@qq.com',
      homePage: '',
      isAdmin: true,
    },
    publishTime: 1647781010946,
  },
]

const Comment = () => {
  const [res, loading]: [[CommentData[]], boolean, any] = useGetData([
    getCommentData,
  ])

  const commentData = useMemo(() => {
    if (!res) return []

    const originCommentList = testData
    return originCommentList
      .filter(c => c.parentId === '')
      .map(p => {
        const children = originCommentList.filter(
          ({ parentId }) => parentId === p.id
        )
        return children.length === 0
          ? { ...p }
          : {
              ...p,
              children: children.sort((a, b) => b.publishTime - a.publishTime),
            }
      })
      .sort((a, b) => b.publishTime - a.publishTime)
  }, [res])

  const columns = [
    {
      title: '昵称',
      dataIndex: ['creator', 'nickname'],
      width: 250,
      render(v: string, r: any) {
        const hompage = r.creator.homePage
        return hompage ? <a href={hompage}>{v}</a> : v
      },
    },
    {
      title: '邮箱',
      dataIndex: ['creator', 'mail'],
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
      sorter: (a: any, b: any) => a.publishTime - b.publishTime,
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '操作',
      key: 'opt',
      render() {
        return (
          <Space size="middle" className="table-opts">
            <a>查看</a>
            <Popconfirm title="确认删除该留言和所有回复吗？">
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
