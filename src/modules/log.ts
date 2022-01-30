import pc from 'picocolors'
import * as fs from 'fs'
import { Time, PadWithZeros } from './functions.js'

/**
 * A function for logging a specific message.
 *
 * @param {string} message
 * @param {('i' | 'e' | 's' | 'w' | 'd')} [type='i']
 */
export const Log = (message: string, type: 'i' | 'e' | 's' | 'w' | 'd' = 'i') => {
	const time = Time()

	const YMD = `${time.year}-${PadWithZeros(time.month, 2)}-${PadWithZeros(time.date, 2)}`
	const HMS = `${PadWithZeros(time.hours, 2)}:${PadWithZeros(time.minutes, 2)}:${PadWithZeros(time.seconds, 2)}`

	let title = ''

	if (type === 'i') title = pc.blue('QuackJS')
	if (type === 'e') title = pc.red('QuackJS')
	if (type === 's') title = pc.green('QuackJS')
	if (type === 'w') title = pc.yellow('QuackJS')
	if (type === 'd') title = pc.magenta('QuackJS')

	console.log(pc.gray(`(${YMD} ${HMS}) (CODE: ${type.toUpperCase()}) `) + title + pc.gray(' » ') + pc.white(message))
	if (fs.existsSync(`./logs/console/`)) fs.appendFileSync(`./logs/console/${YMD}.log`, `${`(${YMD} ${HMS})`} (CODE: ${type.toUpperCase()}) QuackJS » ${message}\n`)
}

/**
 * A function for debugging Functions or Objects
 *
 * @param {(Function | Object)} obj
 * @param {string} [name='none']
 */
export const Debug = (obj: Function | Object, name: string = 'none') => {
	if (typeof obj === 'function') {
		const timeStart = new Date()
		const returnFromObj = obj()
		const timeEnd = new Date()
		Log(name + ' ' + returnFromObj + ' ' + (timeEnd.getTime() - timeStart.getTime()) + 'ms', 'd')
		return
	}

	Log(name + ' ' + obj.constructor.name + ' ' + (obj === null || obj === undefined), 'd')
}
