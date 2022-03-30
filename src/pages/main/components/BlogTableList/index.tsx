import { BlogListData, TagAndGroupItem } from '@src/api/blog'
import { Table, Tag, Space, Button, Input, InputRef, Popconfirm } from 'antd'
import Highlighter from 'react-highlight-words'
import { useMemo, useRef, FC } from 'react'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import style from './style.module.less'
import { SearchOutlined } from '@ant-design/icons'

interface TableRecord {
  title: string
  publishTime: number
  tags: TagAndGroupItem[]
  group: TagAndGroupItem
  id: string
}

interface BlogListProps {
  data: BlogListData
  isDraft?: boolean
}

const BlogTableList: FC<BlogListProps> = ({ data, isDraft }) => {
  const searchTitleRef = useRef<InputRef>(null)

  const blogData = useMemo(() => {
    const blogList = data

    return blogList.data
      .map(({ title, publishTime, tags, group, id }) => ({
        title,
        publishTime,
        tags,
        group,
        id,
      }))
      .sort((a, b) => b.publishTime - a.publishTime)
  }, [data])

  const columns: ColumnsType<TableRecord> = useMemo(
    () => [
      {
        title: '文章名',
        dataIndex: 'title',
        render: (v: string) => {
          return (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchTitleRef.current?.input!.value || '']}
              autoEscape
              textToHighlight={v}
            />
          )
        },
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="搜索文章名"
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => {
                confirm()
              }}
              style={{ marginBottom: 8, display: 'block' }}
              ref={searchTitleRef}
            />
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  confirm()
                }}
              >
                Search
              </Button>
              <Button
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  clearFilters?.()
                }}
              >
                Reset
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
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchTitleRef.current?.select(), 100)
          }
        },
      },
      {
        title: isDraft ? '最后编辑时间' : '发布时间',
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
        render: (v: TagAndGroupItem) => {
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
        render: (v: TagAndGroupItem[]) => {
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
              <Popconfirm title="确认删除吗？">
                <a>删除</a>
              </Popconfirm>
              {!isDraft && <a>阅读</a>}
            </Space>
          )
        },
      },
    ],
    []
  )

  return (
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

export default BlogTableList
