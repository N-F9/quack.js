import { gray, blue, white, red, green, yellow, magenta } from 'picocolors'
import * as fs from 'fs'
import Utils from './utils'

const Log = (message: string, type: 'i' | 'e' | 's' | 'w' | 'd' = 'i') => {
	const time = Utils.Time()

	const YMD = `${time.year}-${Utils.PadWithZeros(time.month, 2)}-${Utils.PadWithZeros(time.date, 2)}`
	const HMS = `${Utils.PadWithZeros(time.hours, 2)}:${Utils.PadWithZeros(time.minutes, 2)}:${Utils.PadWithZeros(time.seconds, 2)}`

	let title = ''

	if (type === 'i') title = blue('QuackJS')
	if (type === 'e') title = red('QuackJS')
	if (type === 's') title = green('QuackJS')
	if (type === 'w') title = yellow('QuackJS')
	if (type === 'd') title = magenta('QuackJS')

	console.log(gray(`(${YMD} ${HMS}) (CODE: ${type.toUpperCase()}) `) + title + gray(' » ') + white(message))
	if (fs.existsSync(`./logs/console/`)) fs.appendFileSync(`./logs/console/${YMD}.log`, `${`(${YMD} ${HMS})`} (CODE: ${type.toUpperCase()}) QuackJS » ${message}\n`)
}

export default Log
