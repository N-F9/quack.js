import { QuackJSTime } from '../../global'

import * as fs from 'fs'
import path from 'path'
import ms from 'ms'

import { Log } from './log'
import Locale from '../handlers/locale'

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
		fs.appendFileSync('errors.txt', `${Utils.Time().TZ}\n${e.stack}\n───────────────\n`)
		;(async () => Log((await Locale()).utils.errors.error, 'e'))()
	},

	GetFiles(directory: string) {
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

	Random(min: number, max: number) {
		return Math.floor(Math.random() * (max + 1 - min)) + min
	},

	RandomizeCapitalization(string: string) {
		return string
			.split('')
			.map((chr) => (Utils.Random(0, 1) ? chr.toLowerCase() : chr.toUpperCase()))
			.join('')
	},

	GenerateID(length: number = 8, base: number = 16) {
		const id = 'x'
			.repeat(length)
			.split('')
			.map(() =>
				Math.floor(Math.random() * base)
					.toString(base)
					.slice(-1),
			)
			.join('')
		return Utils.RandomizeCapitalization(id)
	},

	Emoji(e: string) {
		return e.replace(/<:.+:|>/g, '')
	},

	Backup(file: string) {
		const time = Utils.Time()

		fs.copyFile(file, `./backups/${time.year}-${time.month}-${time.date}-${file}`, (err) => {
			if (err) return this.Error(err)
			;(async () => Log((await Locale()).utils.success.backup.replace(/{file}/g, file), 's'))()
		})
	},

	MS: ms,
}

export default Utils
