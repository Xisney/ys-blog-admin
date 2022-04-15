import { Editor } from '@bytemd/react'
import { FC } from 'react'

import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import breaks from '@bytemd/plugin-breaks'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

import zh from 'bytemd/locales/zh_Hans.json'
import zh_gfm from '@bytemd/plugin-gfm/locales/zh_Hans.json'
import zh_mermain from '@bytemd/plugin-mermaid/locales/zh_Hans.json'

import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import 'bytemd/dist/index.css'
import { message } from 'antd'
import { getAccessFileUrl, uploadFile } from '@src/api/upload'

const plugins: any = [
  gfm({ locale: zh_gfm }),
  highlight(),
  frontmatter(),
  breaks(),
  mediumZoom(),
  mermaid({ locale: zh_mermain }),
]

interface MyEditorProps {
  value: string
  onChange: (v: string) => void
}

// 限制文章中上传图片最大为 2MB
const maxSize = 2 * 1024 * 1024

const MyEditor: FC<MyEditorProps> = ({ value, onChange }) => {
  const handleUploadImages = async (files: File[]) => {
    if (files.length > 1) {
      message.warning('不支持批量上传')
      return []
    }

    const file = files[0]

    const { size, name } = file
    if (size > maxSize) {
      message.warning(`上传的文件${name}大于 2MB，上传失败`)
      return []
    }

    message.loading({ content: '上传中...', key: 'editorUpload', duration: 0 })
    const {
      data: { code, data },
    } = await uploadFile(file)

    if (code === -1) {
      message.error({ content: '服务异常，上传失败', key: 'editorUpload' })
      return []
    }

    message.success({ content: '上传成功', key: 'editorUpload' })

    return [{ url: getAccessFileUrl(data) }]
  }

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={onChange}
      locale={zh}
      uploadImages={handleUploadImages}
    />
  )
}

export default MyEditor
