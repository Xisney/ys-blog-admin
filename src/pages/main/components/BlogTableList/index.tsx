import { BlogListData, deleteBlog, TagAndGroupItem } from '@src/api/blog'
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  InputRef,
  Popconfirm,
  message,
} from 'antd'
import Highlighter from 'react-highlight-words'
import { useMemo, useRef, FC } from 'react'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import style from './style.module.less'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { prodClientUrl } from '../../consts'

interface TableRecord {
  title: string
  publishTime: number
  tags: TagAndGroupItem[]
  group: TagAndGroupItem
  id: number
}

interface BlogListProps {
  data: BlogListData
  isDraft?: boolean
  setData: (data: any) => void
}

const BlogTableList: FC<BlogListProps> = ({ data, isDraft, setData }) => {
  const searchTitleRef = useRef<InputRef>(null)

  const blogData = useMemo(() => {
    const blogList = data

    return blogList.data
      .map(
        ({ title, publishTime, tags, group, id, description, viewCount }) => ({
          title,
          publishTime,
          tags,
          group,
          id,
          description,
          viewCount,
        })
      )
      .sort(
        (a, b) =>
          new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
      )
  }, [data])

  const tagsFilter = useMemo(() => {
    return blogData
      .reduce((pre: string[], { tags }) => {
        tags
          .map(({ label }) => label)
          .forEach(l => {
            if (!pre.includes(l)) {
              pre.push(l)
            }
          })
        return pre
      }, [])
      .map(label => ({ value: label, text: label }))
  }, [blogData])

  const groupFilter = useMemo(() => {
    return blogData
      .reduce((pre: string[], { group }) => {
        if (!pre.includes(group.label)) {
          pre.push(group.label)
        }
        return pre
      }, [])
      .map(label => ({ value: label, text: label }))
  }, [blogData])

  const navigate = useNavigate()

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
        sorter: (a: any, b: any) =>
          new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime(),
      },
      {
        title: '文章分组',
        dataIndex: 'group',
        render: (v: TagAndGroupItem) => {
          return <Tag color="#108ee9">{v.label}</Tag>
        },
        filters: groupFilter,
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
        filters: tagsFilter,
        onFilter: (value, r) => {
          return r.tags.map(t => t.label).includes(value as string)
        },
      },
      {
        title: '操作',
        key: 'opts',
        render: (_, r) => {
          return (
            <Space size="middle" className="blog-opts">
              <a
                onClick={() => {
                  navigate('../write', { state: r })
                }}
              >
                修改
              </a>
              <Popconfirm
                title="确认删除吗？"
                onConfirm={async () => {
                  message.loading({
                    content: '操作中',
                    key: 'blogDelete',
                    duration: 0,
                  })
                  const {
                    data: { code },
                  } = await deleteBlog({ id: r.id })

                  if (code === -1) {
                    message.error({
                      content: '服务异常，删除文章失败',
                      key: 'blogDelete',
                    })
                  } else {
                    message.success({
                      content: '成功删除文章',
                      key: 'blogDelete',
                    })
                    setData([
                      {
                        code: data.code,
                        data: data.data.filter(({ id }) => id !== r.id),
                      },
                    ])
                  }
                }}
              >
                <a>删除</a>
              </Popconfirm>
              {!isDraft && (
                <a href={prodClientUrl + 'blog/' + r.id} target="_blank">
                  阅读
                </a>
              )}
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
