require('dotenv').config()
const QuackJS = require('../../lib')

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
  srcDir: 'test/js/src'
}) 

Quack.Start(Quack)