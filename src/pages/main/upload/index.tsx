import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import {
  uploadAction,
  getFiles,
  getAccessFileUrl,
  removeFile,
} from '@src/api/upload'
import style from './style.module.less'
import { useEffect, useState } from 'react'
import Loading from '@src/components/loading'
import { UploadFile } from 'antd/es/upload/interface'
import { downloadUrl } from '@src/utils'

const UploadPage = () => {
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState<UploadFile[]>([])

  useEffect(() => {
    getFiles()
      .then(({ data: { data, code } }) => {
        if (code === -1) throw '服务异常，请求文件列表失败'

        setFiles(
          data.map((s: string) => {
            return {
              name: s,
              status: 'done',
              thumbUrl: getAccessFileUrl(s),
              url: getAccessFileUrl(s),
              uid: s,
              processFlag: true,
            }
          })
        )
      })
      .catch(e => {
        message.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleFileDownload = (file: any) => {
    downloadUrl(file.url, file.name)
  }

  const handleFileRemove = async (file: any) => {
    message.loading({ content: '删除中...', key: 'fileDelete', duration: 0 })
    const {
      data: { code },
    } = await removeFile({ name: file.name })

    if (code === -1) {
      message.error({ content: '服务异常，删除失败', key: 'fileDelete' })
      return false
    }

    message.success({ content: '成功删除文件', key: 'fileDelete' })
  }

  const handleFileChange = (info: any) => {
    const { fileList } = info

    setFiles(
      fileList.map((f: any) => {
        if (f.processFlag) return f

        if (f.status === 'done') {
          const resName = f.response.data
          return {
            name: resName,
            status: 'done',
            thumbUrl: getAccessFileUrl(resName),
            url: getAccessFileUrl(resName),
            uid: resName,
            processFlag: true,
          }
        }
        return f
      })
    )
  }

  return loading ? (
    <Loading />
  ) : (
    <div className={style['upload-container']}>
      <Upload
        action={uploadAction}
        listType="picture"
        multiple
        fileList={files}
        showUploadList={{
          showDownloadIcon: true,
          showRemoveIcon: true,
        }}
        onDownload={handleFileDownload}
        onRemove={handleFileRemove}
        onChange={handleFileChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  )
}

export default UploadPage
