import 'dotenv/config'
import { QuackJS, QuackJSUtils } from '../../lib/index.js'
import { DataTypes } from 'sequelize'

console.log(
	QuackJSUtils.Discord.Embed(
		{
			embeds: [
				{
					title: 'tesadt {test}',
					footer: {
						text: '{test}',
					},
				},
			],
		},
		{
			'{test}': 'this is a test!',
		},
	),
)

QuackJSUtils.Debug(QuackJSUtils.MS('2 days'))
QuackJSUtils.Debug(() => QuackJSUtils.MS('2 days'))
console.log(QuackJSUtils.GetFiles('./src'))
console.log(QuackJSUtils.GenerateID(10, 36))
console.log(QuackJSUtils.Time())
console.log(QuackJSUtils.Backup('database.sqlite'))
console.log(QuackJSUtils.Emoji('😃'))
console.log(QuackJSUtils.PadWithZeros(10, 24))
console.log(QuackJSUtils.Random(0, 34))
console.log(QuackJSUtils.Exception(new Error('test')))
console.log(QuackJSUtils.MS('2 days'))
console.log(QuackJSUtils.Color('hsla(262, 59%, 81%, 0.5)'))

const html = new QuackJSUtils.HTML()

const div = html.DOM.window.document.createElement('div')
div.innerHTML = QuackJSUtils.HTML.ConvertMarkdownToHTML('# test')

html.DOM.window.document.querySelector('body').appendChild(html.DOM.window.document.createElement('div'))
html.document.querySelector('body').appendChild(div)

console.log(QuackJSUtils.HTML.ConvertMarkdownToHTML('# test'))
console.log(html.ExportToHTML())
console.log(html.toString())

const Quack = new QuackJS(process.env.TOKEN, {
	backups: [
		{
			file: 'database.sqlite',
			scheduling: '0 0 23 * * *',
		},
	],
	logsFolder: true,
})

const Example = Quack.sequelize.define('example', {
	name: DataTypes.STRING,
	stars: DataTypes.NUMBER,
})

Quack.AddModel('example', Example)

Quack.models.example.create({
	name: 'num',
	stars: 2134,
})

const files = QuackJSUtils.GetFiles('./src')

for (const file of files) {
	const execute = (await import('./' + file)).default
	execute(Quack)
}

QuackJSUtils.Debug(Quack)

Quack.Start(Quack)

console.log(Quack.models)

console.log(QuackJSUtils.Color('rgb(100, 100, 100)'), 'Color')
console.log(QuackJSUtils.Variables)
console.log(QuackJSUtils.Time())
console.log(QuackJSUtils.Exception(new Error('test')))
console.log(QuackJSUtils.GetFiles('./logs'))
console.log(QuackJSUtils.PadWithZeros(2, 3))
console.log(QuackJSUtils.Random(1, 3))
console.log(QuackJSUtils.Random(1, 3))
console.log(QuackJSUtils.RandomizeCapitalization('fasfds'))
console.log(QuackJSUtils.GenerateID(10, 8))
console.log(QuackJSUtils.Emoji('🍄'))
console.log(QuackJSUtils.Emoji('<:name:941145237986893844>'))
