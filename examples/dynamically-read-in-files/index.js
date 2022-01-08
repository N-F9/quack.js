require('dotenv').config()
const { QuackJS, QuackJSUtils } = require('../../')
const fs = require('fs')

const Quack = new QuackJS(process.env.TOKEN, {
  backups: false,
  logsFolder: false,
  database: false
}) 

const files = QuackJSUtils.GetFiles('./src')

for (const file of files) {
  const execute = require('./' + file)
  execute(Quack)
}

Quack.Start(Quack)