import { QuackJSUtils } from '../../../lib/index.js'

export default (QuackJS) => {
	QuackJS.CreateEvent({
		name: 'ready',
		execute(client) {
			QuackJSUtils.Log('Bot has been loaded!', 's')
			QuackJSUtils.Log(`Total Guilds: ${client.guilds.cache.size}`)
			QuackJSUtils.Log(`Total Users: ${client.users.cache.size}`)
			QuackJSUtils.Log(`Total Commands: ${QuackJS.commands.length}`)
			QuackJSUtils.Log(`Total Events: ${QuackJS.events.length}`)
			QuackJSUtils.Log(`Total Triggers: ${QuackJS.triggers.length}`)
		},
	})
}
