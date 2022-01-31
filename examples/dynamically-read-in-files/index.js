import dotenv from 'dotenv'
import { QuackJS, QuackJSUtils } from '../../lib/index.js'

dotenv.config()

const Quack = new QuackJS(process.env.TOKEN, {
  backups: false,
  logsFolder: false,
  database: false
}) 

const files = QuackJSUtils.GetFiles('./src')

for (const file of files) {
  const execute = (await import('./' + file)).default
  execute(Quack)
}

Quack.Start(Quack)