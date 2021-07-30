module.exports = (QuackJS) => {
  QuackJS.CreateCommand({
    name: 'test2',
    aliases: [],
    description: 'gfd',
    type: 'fdsa',
    usage: 'fdsf',
    permission: 'everyone',
    execute(QuackJS, message, args) {
      console.log(QuackJS, message, args)
    }
  })
}