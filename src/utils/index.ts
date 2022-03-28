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
