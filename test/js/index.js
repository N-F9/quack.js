require('dotenv').config()
const { QuackJS, QuackJSUtils } = require('../../')
const fs = require('fs')

// console.log(QuackJSUtils.Discord.Embed({
//   embeds: [
//     {
//       title: 'tesadt {test}',
//       footer: {
//         text: '{test}'
//       }
//     }
//   ]
// }, {
//   '{test}': 'this is a test!'
// }))

console.log(QuackJSUtils.GetFiles('./src'))
// console.log(QuackJSUtils.GenerateID(10, 36))
// console.log(QuackJSUtils.Time())
// console.log(QuackJSUtils.Backup('database.sqlite'))
// console.log(QuackJSUtils.Emoji('😃'))
// console.log(QuackJSUtils.PadWithZeros(10, 24))
// console.log(QuackJSUtils.Random(0, 34))
// console.log(QuackJSUtils.Error(new Error('test')))
console.log(QuackJSUtils.MS('2 days'))

const Quack = new QuackJS(process.env.TOKEN, {
  backups: [
    {
      file: 'database.sqlite',
      scheduling: '0 0 23 * * *'
    }
  ],
  logsFolder: true,
}) 

const files = fs.readdirSync('./src')

for (const file of files) {
  const execute = require(`./src/${file}`)
  execute(Quack)
}

Quack.Start(Quack)