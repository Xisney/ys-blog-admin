export const getRealFilename = (name: string) => {
  return name.slice(0, name.lastIndexOf('-'))
}
