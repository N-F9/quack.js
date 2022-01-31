import dotenv from 'dotenv'
import { QuackJS } from '../../lib/index.js'

dotenv.config()

const Quack = new QuackJS(process.env.TOKEN, {
  backups: false,
  logsFolder: false,
  database: false
}) 

Quack.CreateCommand({
  name: 'ping',
  description: 'Ping',
  permission: 'everyone',
  guilds: ['728269506710995034'],
  execute(interaction) {
    interaction.reply('pong!')
  }
})

Quack.Start(Quack)