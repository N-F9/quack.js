const { QuackJSUtils } = require('../../../../lib')

module.exports = (QuackJS) => {
  QuackJS.CreateEvent({
    name: 'ready',
    execute(client) {
      QuackJSUtils.Log('Bot has been loaded!', 's')
      QuackJSUtils.Log(`Total Guilds: ${client.guilds.cache.size}`)
      QuackJSUtils.Log(`Total Users: ${client.users.cache.size}`)
      QuackJSUtils.Log(`Total Commands: ${QuackJS.commands.length}`)
      QuackJSUtils.Log(`Total Events: ${QuackJS.events.length}`)
    }
  })
}