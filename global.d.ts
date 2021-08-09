import * as DiscordJS from 'discord.js'
// import { QuackJS } from './src/'

declare type QuackJSConfig = {
  prefix: string
  srcDir: string
  doubleQuoteArgs?: boolean
  parseArgs?: boolean
  intents: DiscordJS.Intents[]
  configs: Record<string, Object>
}

declare interface QuackJSObject {
  config: QuackJSConfig
  client: DiscordJS.Client
  commands: QuackJSCommand[]
  slashCommands: QuackJSSlashCommand[]
  events: QuackJSEvent[]
  triggers: QuackJSTrigger[]
  files: string[]
  configs: Record<string, Object>
  modules: QuackJSModule[]
}

declare type QuackJSCommand = {
  name: string
  aliases: string[]
  description: string
  usage: string
  type: string
  permission: string
  execute: (client: DiscordJS.Client, message: DiscordJS.Message, args: any[], command?: string, prefix?: string) => void
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

declare type QuackJSModule = {
  name: string
  file: string
  module: (QuackJS: any) => void // this will need to be fixed
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
  components?: (DiscordJS.MessageActionRow | DiscordJS.MessageActionRowOptions)[]
}

declare type QuackJSPromptOptions = {
  type: 'message' | 'reaction'
  emoji?: string
}