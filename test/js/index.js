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
  slash: false,
  srcDir: 'test/js/src',
  doubleQuoteArgs: true,
  parseArgs: true
}) 

Quack.Start(Quack)