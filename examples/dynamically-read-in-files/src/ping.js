export default (QuackJS) => {
	QuackJS.CreateCommand({
		name: 'ping',
		description: 'Ping',
		permission: 'everyone',
		guilds: ['728269506710995034'],
		execute(interaction) {
			interaction.reply('pong!')
		},
	})
}
