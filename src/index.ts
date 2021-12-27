import { QuackJSConfig, QuackJSEvent, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global'

import * as DiscordJS from 'discord.js'
import _ from 'lodash'
import * as logs from 'discord-logs'
import { Model, ModelCtor, Sequelize } from 'sequelize'
import { scheduleJob } from 'node-schedule'

import Utils from './modules/utils'
import Log from './modules/log'
import Discord from './modules/discord'
import Color from './modules/color'

export const QuackJSUtils = {
	...Utils,
	Log,
	Discord,
	Color
}

export class QuackJS implements QuackJSObject {
	public config: QuackJSConfig
	public client: DiscordJS.Client
	public commands: QuackJSSlashCommand[]
	public triggers: QuackJSTrigger[]
	public events: QuackJSEvent[]
	public variables: Record<string, object>
	public sequelize: Sequelize
	public models: Record<string, ModelCtor<Model<any, any>>>

	private token: string

	constructor(token: string, config: QuackJSConfig) {
		this.token = token
		this.config = config

		this.commands = []
		this.events = []
		this.triggers = []
		this.variables = {}

		this.sequelize = new Sequelize(
			config.database || {
				dialect: 'sqlite',
				storage: 'database.sqlite',
				logging: false,
			},
		)

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
			execute(client: DiscordJS.Client, interaction: DiscordJS.Interaction) {
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
						content: 'There was an error while executing this command!',
						ephemeral: true,
					})
				}
			},
		})

		this.CreateEvent({
			name: 'ready',
			execute(client: DiscordJS.Client) {
				if (QuackJS.config.backups) {
					QuackJS.config.backups.forEach(backup => {
						QuackJSUtils.Backup(backup.file)
						scheduleJob(backup.scheduling, () => {
							QuackJSUtils.Backup(backup.file)
						})
					})
				}

				const commandsNames = QuackJS.commands.map((c) => c.name)
				if (new Set(commandsNames).size !== commandsNames.length) Log('Two or more commands have the same name!', 'w')
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
									Utils.Error(new Error('An error occurred while creating guild specific commands!'))
								}
							}
						}
					}
				})()
			},
		})

		try {
			this.sequelize.authenticate()
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

	public AddModel(name: string, model: ModelCtor<Model<any, any>>) {
		this.models[name] = model
		this.sequelize.sync()
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
