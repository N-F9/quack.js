require('dotenv').config()
const { QuackJS } = require('../../')
const fs = require('fs')

const Quack = new QuackJS(process.env.TOKEN, {
  backups: false,
  logsFolder: false,
}) 

const files = fs.readdirSync('./src')

for (const file of files) {
  const execute = require(`./src/${file}`)
  execute(Quack)
}

Quack.Start(Quack)