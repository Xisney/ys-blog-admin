import { Editor } from '@bytemd/react'
import { useState } from 'react'

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
import './style.module.less'

const plugins: any = [
  gfm({ locale: zh_gfm }),
  highlight(),
  frontmatter(),
  breaks(),
  mediumZoom(),
  mermaid({ locale: zh_mermain }),
]

const Write = () => {
  const [value, setValue] = useState('')

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={v => {
        setValue(v)
      }}
      locale={zh}
    />
  )
}

export default Write
