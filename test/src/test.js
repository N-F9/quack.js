import { QuackJSUtils } from '../../../lib/index.js'

export default (QuackJS) => {
	QuackJS.CreateTrigger({
		name: 'test',
		trigger: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim,
		async execute(client, message) {
			message.channel.send('testtest').then((m) => {
				m.react('👍')
				QuackJSUtils.Discord.Prompt(m, message.member, {
					type: 'reaction',
					emoji: '👍',
				}).then((c) => {
					console.log(c)
				})
				QuackJSUtils.Discord.Prompt(m, message.member, {
					type: 'message',
				}).then((c) => {
					console.log(c)
				})
			})

			QuackJSUtils.Discord.CreateRole(message.guild, {
				name: 'fdsafdsa',
			})
			QuackJSUtils.Discord.DeleteRole(message.guild, 'fdsafdsa')
			console.log(QuackJSUtils.Discord.HasRole(message.member, '299672434041421825'))
			await QuackJSUtils.Discord.GiveRole(message.guild, message.member, '852313820177104936')
			await QuackJSUtils.Discord.RemoveRole(message.guild, message.member, '728334551012606024')
			await QuackJSUtils.Discord.CreateChannel(message.guild, 'name', {})
			QuackJSUtils.Discord.DeleteChannel(message.guild, '739927584489341171')
			await QuackJSUtils.Discord.CreateCategory(message.guild, 'name', {})
			QuackJSUtils.Discord.DeleteChannel(message.guild, '931943891417038948')
			QuackJSUtils.Discord.MoveChannelToCategory(message.guild, '941148218304122990', '941148218857750528')
		},
	})

	QuackJS.CreateCommand({
		name: 'test',
		description: 'this is a test command',
		permission: 'everyone',
		guilds: ['728269506710995034'],
		execute(interaction) {
			console.log(interaction)
			interaction.reply(
				QuackJSUtils.Discord.Embed({
					embeds: [
						{
							color: QuackJSUtils.Color('rgb(0, 173, 255)'),
							title: 'test',
						},
					],
				}),
			)
		},
	})
}
