export function debouce(fn: Function, delay = 300) {
  let flag: number | undefined
  return (...args: any) => {
    if (flag) clearTimeout(flag)
    flag = setTimeout(() => {
      fn(...args)
      flag = undefined
    }, delay)
  }
}

const imageType: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpg',
}
function runDownload(url: string, name: string) {
  const a = document.createElement('a')
  a.download = name
  a.href = url
  a.click()
}
export function downloadUrl(url: string, name: string) {
  // const type = name.split('.')[1]

  // if (Object.keys(imageType).includes(type)) {
  //   const image = new Image()
  //   image.src = url
  //   image.crossOrigin = 'anonymous'
  //   image.onload = () => {
  //     const canvas = document.createElement('canvas')
  //     canvas.getContext('2d')?.drawImage(image, 0, 0)

  //     canvas.toBlob(blog => {
  //       if (!blog) return

  //       runDownload(window.URL.createObjectURL(blog), name)
  //     }, imageType[type])
  //   }
  // } else {
  //   runDownload(url, name)
  // }
  runDownload(url, name)
}
