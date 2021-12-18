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
		fs.appendFileSync('errors.txt', `${Utils.Time().TZ}\n${e.stack}\n───────────────\n`)
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
			if (err) throw err
			Log(`Created backup of ${file}`, 's')
		})
	},
}

export default Utils
