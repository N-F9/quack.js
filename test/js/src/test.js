import { QuackJSUtils } from '../../../lib/index.js'

export default (QuackJS) => {
  QuackJS.CreateTrigger({
    name: 'test',
    trigger: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm,
    execute(client, message) {
      message.channel.send('testtest').then(m => {
        m.react('👍')
        QuackJSUtils.Discord.Prompt(m, message.member, {
          type: 'reaction',
          emoji: '👍'
        }).then(c => {
          console.log(c)
        })
        QuackJSUtils.Discord.Prompt(m, message.member, {
          type: 'message'
        }).then(c => {
          console.log(c)
        })
      })
    }
  })

  QuackJS.CreateCommand({
    name: 'test',
    description: 'this is a test command',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    execute(interaction) {
      console.log(interaction)
      interaction.reply(QuackJSUtils.Discord.Embed({
        embeds: [{
          color: QuackJSUtils.Color('rgb(0, 173, 255)'),
          title: 'test'
        }]
      }))
    }
  })
}