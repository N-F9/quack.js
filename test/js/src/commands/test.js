const { QuackJSUtils } = require('../../../../lib')

module.exports = (QuackJS) => {
  QuackJS.CreateCommand({
    name: 'test2',
    aliases: [],
    description: 'gfd',
    type: 'fdsa',
    usage: 'fdsf',
    permission: 'everyone',
    execute(client, message, args) {
      console.log(args)
    }
  })

  QuackJS.CreateTrigger({
    name: 'test',
    trigger: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm,
    execute(client, message) {
      // console.log(client, message)
      message.channel.send('testtest').then(m => {
        m.react('👍')
        QuackJSUtils.Discord.Prompt(m, message.member, {
          type: 'reaction',
          emoji: '👍'
        }).then(c => {
          console.log(c)
        })
        // QuackJSUtils.Discord.Prompt(m, message.member, {
        //   type: 'message'
        // }).then(c => {
        //   console.log(c)
        // })
      })
    }
  })

  QuackJS.CreateSlash({
    name: 'test',
    description: 'this is a test command',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    execute(interaction) {
      console.log(interaction)
      interaction.reply('yay!')
    }
  })
}