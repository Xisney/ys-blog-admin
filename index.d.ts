interface ImportMetaEnv {
  [key: string]: string | boolean | undefined
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.module.less' {
  const obj: Record<string, string>
  export default obj
}

declare module '*.jpg' {
  const path: string
  export default path
}

declare module '*.png' {
  const path: string
  export default path
}

declare module 'jinrishici' {
  const load: (onSuccess: (res: any) => void, onError: (e: any) => void) => void

  export { load }
}
