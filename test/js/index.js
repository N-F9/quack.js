require('dotenv').config()
const QuackJS = require('../../lib')

// console.log(QuackJS.QuackJSUtils.Discord.Embed({
//   title: 'tesadt {test}',
//   footer: {
//     text: '{test}'
//   }
// }, {
//   '{test}': 'this is a test!'
// }))

const Quack = new QuackJS.QuackJS(process.env.TOKEN, {
  prefix: '-',
  configs: {
    config: {
      this_is_a_test: 'lol'
    },
    lang: `
wow: wow!
    `
  },
  srcDir: 'src',
  doubleQuoteArgs: true,
  parseArgs: true,
  intents: []
}) 

Quack.Start(Quack)