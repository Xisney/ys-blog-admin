import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload, Modal } from 'antd'
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
import { getRealFilename } from './utils'

const { confirm } = Modal

const UploadPage = () => {
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState<UploadFile[]>([])

  useEffect(() => {
    getFiles()
      .then(({ data: { data, code } }) => {
        if (code === -1) throw '服务异常，请求文件列表失败'

        setFiles(
          data
            .map(({ name: s, size }: { name: string; size: string }) => {
              return {
                name: s + '-' + size,
                status: 'done',
                thumbUrl: getAccessFileUrl(s),
                url: getAccessFileUrl(s),
                uid: s,
                processFlag: true,
              }
            })
            .reverse()
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
    downloadUrl(file.url, getRealFilename(file.name))
  }

  const handleFileRemove = async (file: any) => {
    let resolveFn: any
    const guardPromise = new Promise<boolean>(resolve => {
      resolveFn = resolve
    })

    confirm({
      title: `确认删除该文件吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '删除后文件将永久消失，请确保没有文章引用',
      centered: true,
      okType: 'danger',
      maskClosable: true,
      transitionName: '',
      onOk: async () => {
        message.loading({
          content: '删除中...',
          key: 'fileDelete',
          duration: 0,
        })

        const targetName = getRealFilename(file.name)
        const {
          data: { code },
        } = await removeFile({ name: targetName })

        if (code === -1) {
          message.error({ content: '服务异常，删除失败', key: 'fileDelete' })
          resolveFn(false)
          return
        }

        message.success({ content: '成功删除文件', key: 'fileDelete' })
        resolveFn(true)
      },
      onCancel() {
        resolveFn(false)
      },
    })

    return guardPromise
  }

  const handleFileChange = (info: any) => {
    const { fileList } = info

    setFiles(
      fileList.map((f: any) => {
        if (f.processFlag) return f

        if (f.status === 'done') {
          const { name: resName, size } = f.response.data
          return {
            name: resName + '-' + size,
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
