import { getBlogListData, BlogListData, tagAndGroupItem } from '@src/api/blog'
import Loading from '@src/components/loading'
import useGetData from '@src/hooks/useGetData'
import { Table, Tag, Space, Button, Input } from 'antd'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import style from './style.module.less'
import { SearchOutlined } from '@ant-design/icons'

interface TableRecord {
  title: string
  publishTime: number
  tags: tagAndGroupItem[]
  group: tagAndGroupItem
  id: string
}

const Blog = () => {
  const [res, loading]: [[BlogListData], boolean] = useGetData([
    getBlogListData,
  ])
  const [searchTitle, setSearchTitle] = useState('')

  const blogData = useMemo(() => {
    const blogList = res && res[0]

    return blogList?.dataList
      .map(({ title, publishTime, tags, group, id }) => ({
        title,
        publishTime,
        tags,
        group,
        id,
      }))
      .sort((a, b) => b.publishTime - a.publishTime)
  }, [res])

  const columns: ColumnsType<TableRecord> = useMemo(
    () => [
      {
        title: '文章名',
        dataIndex: 'title',
        render: (v: string) => {
          return v
        },
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`搜索文章名`}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button type="link" size="small" onClick={() => {}}>
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (v, r) => {
          return r.title.includes(v as string)
        },
      },
      {
        title: '发布时间',
        dataIndex: 'publishTime',
        render: (v: number) => {
          return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
        },
        sortDirections: ['ascend'],
        sorter: (a: any, b: any) => a.publishTime - b.publishTime,
      },
      {
        title: '文章分组',
        dataIndex: 'group',
        render: (v: tagAndGroupItem) => {
          return <Tag color="#108ee9">{v.label}</Tag>
        },
        filters: [
          {
            value: '学习笔记',
            text: '学习笔记',
          },
          {
            value: 'React实践',
            text: 'React实践',
          },
        ],
        filterMultiple: false,
        onFilter: (value, r) => r.group.label === (value as string),
      },
      {
        title: '文章标签',
        dataIndex: 'tags',
        render: (v: tagAndGroupItem[]) => {
          return v.map((t, i) => {
            const color = ['red', 'green', 'blue']

            return (
              <Tag key={t.id} color={color[i]}>
                {t.label}
              </Tag>
            )
          })
        },
        filters: [
          {
            value: '学习笔记',
            text: '学习笔记',
          },
          {
            value: 'React实践',
            text: 'React实践',
          },
        ],
        onFilter: (value, r) => {
          return r.tags.map(t => t.label).includes(value as string)
        },
      },
      {
        title: '操作',
        key: 'opts',
        render: () => {
          return (
            <Space size="middle" className="blog-opts">
              <a>修改</a>
              <a>删除</a>
              <a>阅读</a>
            </Space>
          )
        },
      },
    ],
    [res]
  )

  return loading ? (
    <Loading />
  ) : (
    <div className={style['blog-container']}>
      <Table
        dataSource={blogData}
        columns={columns}
        pagination={{ total: blogData.length }}
        rowKey="id"
      />
    </div>
  )
}

export default Blog
