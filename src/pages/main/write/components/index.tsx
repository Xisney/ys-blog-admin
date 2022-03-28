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

const MyEditor: FC<MyEditorProps> = ({ value, onChange }) => {
  return (
    <Editor value={value} plugins={plugins} onChange={onChange} locale={zh} />
  )
}

export default MyEditor
