declare module '*.module.less' {
  const obj: Record<string, string>
  export default obj
}

declare module '*.svg' {
  const path: string
  export default path
}
