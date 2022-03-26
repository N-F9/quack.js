import 'dotenv/config'
import { QuackJS } from '../../lib/index.js'

const Quack = new QuackJS(process.env.TOKEN, {
	backups: false,
	logsFolder: false,
	database: false,
})

Quack.CreateCommand({
	name: 'ping',
	description: 'Ping',
	permission: 'everyone',
	guilds: ['728269506710995034'],
	execute(interaction) {
		interaction.reply('pong!')
	},
})

Quack.Start(Quack)
