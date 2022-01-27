import dotenv from 'dotenv'
import path from 'path'
import { QuackJS, QuackJSUtils } from '@n-f9/quack.js'

dotenv.config()

const Quack = new QuackJS(process.env.TOKEN as string, {}) 

const files = QuackJSUtils.GetFiles('./out/modules')

const getModules = async () => {
	for (const file of files) {
		const execute = (await import(path.join(__dirname, '../', file))).default
		await execute(Quack)
	}
}

getModules().then(() => {
  Quack.Start(Quack)
})
