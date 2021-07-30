import * as fs from 'fs'
import { QuackJSTime } from '../../global'
import Log from './log'

const Utils = {
  Time(date = new Date()): QuackJSTime {
    const d = new Date(date)
    return {
      UTC: d.toUTCString(),
      ISO: d.toISOString(),
      TZ: d.toString(),
      date: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
    }
  },
  Error(e: Error): void {
    fs.appendFileSync(
      'errors.txt',
      `${Utils.Time().TZ}\n${e.stack}\n───────────────\n`,
    )
    Log('An error has occured!', 'e')
  },
  MkDir(name: string): boolean {
    if (!fs.existsSync(`./${name}`)) {
      fs.mkdirSync(`./${name}`)
      return true
    } else {
      return false
    }
  },
  PadWithZeros(number: number, length: number): string {
    let n = '' + number
    while (n.length < length) {
      n = '0' + n
    }
    return n
  },
}

export default Utils
