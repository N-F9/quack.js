import { QuackJSConfig, QuackJSEvent, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global'

import * as DiscordJS from 'discord.js'
import * as logs from 'discord-logs'
import _ from 'lodash'
import { Model, ModelStatic, Options, Sequelize } from 'sequelize'
import { scheduleJob } from 'node-schedule'

import Utils from './modules/utils.js'
import { Log, Debug } from './modules/log.js'
import Discord from './modules/discord.js'
import HTML from './modules/html.js'
import Color from './handlers/color.js'
import Locale from './handlers/locale.js'
import Variables from './handlers/variables.js'

export const QuackJSUtils = {
	...Utils,
	Log,
	Debug,
	Discord,
	HTML,

	Color,
	Locale,
	Variables,
}

/**
 * The main class for creating and managing Discord bots
 *
 * @export
 * @class QuackJS
 * @implements {QuackJSObject}
 */
export class QuackJS implements QuackJSObject {
	public config: QuackJSConfig
	public client: DiscordJS.Client
	public commands: QuackJSSlashCommand[]
	public triggers: QuackJSTrigger[]
	public events: QuackJSEvent[]
	public sequelize: Sequelize | undefined
	public models: Record<string, ModelStatic<Model<any, any>>>

	private token: string

	constructor(token: string, config: QuackJSConfig) {
		this.token = token
		this.config = config

		this.commands = []
		this.triggers = []
		this.events = []

		const defaultDatabase: Options = {
			dialect: 'sqlite',
			storage: 'database.sqlite',
			logging: false,
		}
		if (typeof config.database === 'boolean') {
			if (config.database) this.sequelize = new Sequelize(defaultDatabase)
			else this.sequelize = undefined
		} else this.sequelize = new Sequelize(config.database || defaultDatabase)

		this.models = {}

		this.client = new DiscordJS.Client({
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
			intents: [
				// DiscordJS.Intents.FLAGS.DIRECT_MESSAGES,
				// DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
				// DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
				DiscordJS.Intents.FLAGS.GUILDS, // -
				// DiscordJS.Intents.FLAGS.GUILD_BANS,
				// DiscordJS.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				// DiscordJS.Intents.FLAGS.GUILD_INTEGRATIONS,
				// DiscordJS.Intents.FLAGS.GUILD_INVITES,
				DiscordJS.Intents.FLAGS.GUILD_MEMBERS, // -
				DiscordJS.Intents.FLAGS.GUILD_MESSAGES, // -
				DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, // -
				// DiscordJS.Intents.FLAGS.GUILD_MESSAGE_TYPING,
				// DiscordJS.Intents.FLAGS.GUILD_PRESENCES,
				// DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES,
				// DiscordJS.Intents.FLAGS.GUILD_WEBHOOKS,
				...(this.config.intents || []),
			],
		})
	}

	public async Start(QuackJS: QuackJS) {
		if (QuackJS.config.logsFolder) QuackJSUtils.MkDir('logs')
		if (QuackJS.config.logsFolder) QuackJSUtils.MkDir('logs/console')
		if (QuackJS.config.backups) QuackJSUtils.MkDir('backups')

		logs.default(QuackJS.client)

		this.CreateEvent({
			name: 'messageCreate',
			execute(client: DiscordJS.Client, message: DiscordJS.Message) {
				if (message.author.bot) return
				QuackJS.triggers.forEach((trigger) => {
					if (message.content.match(trigger.trigger)) {
						trigger.execute(client, message)
					}
				})
			},
		})

		this.CreateEvent({
			name: 'interactionCreate',
			async execute(client: DiscordJS.Client, interaction: DiscordJS.Interaction) {
				if (!interaction.isCommand()) return

				const i = _.findIndex(QuackJS.commands, {
					name: interaction.commandName,
				})

				if (i === -1) return

				try {
					QuackJS.commands[i].execute(interaction)
				} catch (error: any) {
					Utils.Error(error)
					interaction.reply({
						content: Locale().commands.errors.execution,
						ephemeral: true,
					})
				}
			},
		})

		this.CreateEvent({
			name: 'ready',
			async execute(client: DiscordJS.Client) {
				if (QuackJS.config.backups) {
					QuackJS.config.backups.forEach((backup) => {
						QuackJSUtils.Backup(backup.file)
						scheduleJob(backup.scheduling, () => {
							QuackJSUtils.Backup(backup.file)
						})
					})
				}

				const commandsNames = QuackJS.commands.map((c) => c.name)
				if (new Set(commandsNames).size !== commandsNames.length) Log(Locale().commands.errors.names, 'w')
				;(async () => {
					if (!client.application?.owner) await client.application?.fetch()

					for (const command of QuackJS.commands) {
						const cpermission = command.permission

						if (command.guilds.length === 0) {
							await client.application?.commands.create(command)
						} else {
							for (const guild of command.guilds) {
								try {
									const c = await client.guilds.cache.get(guild)?.commands.create(command)

									if (cpermission !== 'everyone') {
										c?.permissions.add({
											permissions: [
												{
													id: cpermission,
													type: 'ROLE',
													permission: true,
												},
											],
										})
									}
								} catch (error) {
									Utils.Error(new Error(Locale().commands.errors.creation))
								}
							}
						}
					}
				})()
			},
		})

		try {
			this.sequelize?.authenticate()
		} catch (error: any) {
			QuackJSUtils.Error(new Error(error))
		}

		await this.StartEvents()
		await this.Login()
	}

	private async StartEvents() {
		for (const event of this.events) {
			this.client.on(event.name, event.execute.bind(null, this.client))
		}
	}

	private async Login() {
		return new Promise((resolve, _reject) => {
			resolve(this.client.login(this.token))
		})
	}

	public AddModel(name: string, model: ModelStatic<Model<any, any>>) {
		this.models[name] = model
		this.sequelize?.sync()
	}

	public CreateCommand(slashCommand: QuackJSSlashCommand) {
		this.commands.push(slashCommand)
	}

	public CreateEvent(event: QuackJSEvent) {
		this.events.push(event)
	}

	public CreateTrigger(trigger: QuackJSTrigger) {
		this.triggers.push(trigger)
	}
}
