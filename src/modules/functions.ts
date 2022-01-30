import { QuackJSTime } from '../../global'

import * as fs from 'fs'
import path from 'path'
import ms from 'ms'

import { Log } from './log.js'
import { Locale } from '../handlers/locale.js'

/**
 * A function which returns an object containing useful time numbers and information.
 *
 * @param {*} [date=new Date()]
 * @return {*}  {QuackJSTime}
 */
export const Time = (date = new Date()): QuackJSTime => {
	const d = new Date(date)
	return {
		ms: d.getTime(),
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
}

/**
 * A function for handling errors.
 *
 * @param {Error} e
 */
export const Exception = (e: Error): void => {
	fs.appendFileSync('errors.txt', `${Time().TZ}\n${e.stack}\n───────────────\n`)
	Log(Locale().utils.errors.error, 'e')
}

/**
 * A function for grabbing all of the files in a directory.
 *
 * @param {string} directory
 * @return {*} {string[]}
 */
export const GetFiles = (directory: string): string[] => {
	const recursivelyGetFiles = (dir: string, allFiles: string[] = []) => {
		const files: string[] = fs.readdirSync(dir)

		files.forEach((file) => {
			if (fs.lstatSync(dir + '/' + file).isDirectory()) {
				allFiles = recursivelyGetFiles(dir + '/' + file, allFiles)
			} else {
				allFiles?.push(path.join('./', dir, '/', file))
			}
		})

		return allFiles
	}

	return recursivelyGetFiles(directory)
}

/**
 * A function for creating directories
 *
 * @param {string} name
 * @return {*}  {boolean}
 */
export const MkDir = (name: string): boolean => {
	if (!fs.existsSync(`./${name}`)) {
		fs.mkdirSync(`./${name}`)
		return true
	} else {
		return false
	}
}

/**
 * A function for padding a number with zeros; usefully for ticketing modules.
 *
 * @param {number} number
 * @param {number} length
 * @return {*}  {string}
 */
export const PadWithZeros = (number: number, length: number): string => {
	let n = '' + number
	while (n.length < length) {
		n = '0' + n
	}
	return n
}

/**
 * A function for generating a random number between min and max inclusively.
 *
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 */
export const Random = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max + 1 - min)) + min
}

/**
 * A function for randomly capitalizing a string.
 *
 * @param {string} string
 * @return {*}  {string}
 */
export const RandomizeCapitalization = (string: string): string => {
	return string
		.split('')
		.map((chr) => (Random(0, 1) ? chr.toLowerCase() : chr.toUpperCase()))
		.join('')
}

/**
 * A function for generating a random id.
 *
 * @param {number} [length=8]
 * @param {number} [base=16]
 * @return {*}  {string}
 */
export const GenerateID = (length: number = 8, base: number = 16): string => {
	const id = 'x'
		.repeat(length)
		.split('')
		.map(() =>
			Math.floor(Math.random() * base)
				.toString(base)
				.slice(-1),
		)
		.join('')
	return RandomizeCapitalization(id)
}

export const Emoji = (e: string): string => {
	return e.replace(/<:.+:|>/g, '')
}

/**
 * A function for generating a backup of a file.
 *
 * @param {string} file
 */
export const Backup = (file: string): void => {
	const time = Time()

	fs.copyFile(file, `./backups/${time.year}-${time.month}-${time.date}-${file}`, (err) => {
		if (err) return Exception(err)
		Log(Locale().utils.success.backup.replace(/{file}/g, file), 's')
	})
}

export const MS = ms
