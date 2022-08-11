import * as DiscordJS from 'discord.js'
import * as Sequelize from 'sequelize'

// https://stackoverflow.com/a/65948871
// https://stackoverflow.com/a/62081238

declare type QuackJSConfig = {
	logsFolder?: boolean
	backups?: QuackJSBackup[]
	intents?: DiscordJS.GatewayIntentBits[]
	database?: Sequelize.Options | boolean
}

declare interface QuackJSObject {
	config: QuackJSConfig
	client: DiscordJS.Client
	commands: QuackJSSlashCommand[]
	events: QuackJSEvent[]
	triggers: QuackJSTrigger[]
	sequelize: Sequelize.Sequelize | undefined
	models: Record<string, Sequelize.ModelCtor<Sequelize.Model<any, any>>>
}

declare type QuackJSSlashCommand = {
	name: string
	description: string
	options?: DiscordJS.ApplicationCommandOptionData[]
	defaultPermission?: boolean
	permission: string
	guilds: string[] // put nothing for global command, if global then permissions will not work
	execute: (interaction: DiscordJS.CommandInteraction) => void
}

declare type QuackJSEvent = {
	name: string
	execute: Function
}

declare type QuackJSTrigger = {
	name: string
	trigger: string | RegExp
	execute: (client: DiscordJS.Client, message: DiscordJS.Message) => void
}

declare type QuackJSTime = {
	ms: number
	UTC: string
	ISO: string
	TZ: string
	date: number
	month: number
	year: number
	hours: number
	minutes: number
	seconds: number
}

declare type QuackJSPromptOptions = {
	type: 'message' | 'reaction'
	emoji?: string
}

declare type QuackJSBackup = {
	file: string
	scheduling: string
}
