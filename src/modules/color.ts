import * as col from 'color'

const Color = (color: string) => {
  const c = col.default(color)
  return parseInt(c.hex().substring(1), 16)
}

export default Color