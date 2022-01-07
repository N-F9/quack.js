import * as DiscordJS from 'discord.js'
import * as Sequelize from 'sequelize'

// https://stackoverflow.com/a/65948871
// https://stackoverflow.com/a/62081238

declare type QuackJSConfig = {
  logsFolder?: boolean 
  backups?: QuackJSBackup[]
  intents?: DiscordJS.Intents[]
  database?: Sequelize.Options
  locale?: 'en-US'
}

declare interface QuackJSObject {
  config: QuackJSConfig
  client: DiscordJS.Client
  commands: QuackJSSlashCommand[]
  events: QuackJSEvent[]
  triggers: QuackJSTrigger[]
  sequelize: Sequelize.Sequelize
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

declare type QuackJSField = {
  name: string
  value: string
  inline?: boolean
}

declare type QuackJSEmbed = {
  color?: number | string
  title?: string
  url?: string
  author?: {
    name?: string
    icon_url?: string
    url?: string
  }
  description?: string
  thumbnail?: string
  fields?: QuackJSField[]
  image?: string
  timestamp?: Date | string | number
  footer?: {
    text?: string
    icon_url?: string
  }
  content?: string
}

declare type QuackJSMessage = {
  embeds: QuackJSEmbed[]
  content: string
  files?: DiscordJS.MessageAttachment[]
  components?: (DiscordJS.MessageActionRow | (Required<DiscordJS.BaseMessageComponentOptions> & DiscordJS.MessageActionRowOptions))[]
}

declare type QuackJSPromptOptions = {
  type: 'message' | 'reaction'
  emoji?: string
}

declare type QuackJSBackup = {
  file: string
  scheduling: string
}