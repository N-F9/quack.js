import { QuackJSCommand, QuackJSConfig, QuackJSEvent, QuackJSModule, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global'
import * as DiscordJS from 'discord.js'
import * as fs from 'fs'
import * as _ from 'lodash'
import * as logs from 'discord-logs'

import Utils from './modules/utils'
import Log from './modules/log'
import YAML from './modules/yaml'
import DB from './modules/database'
import Discord from './modules/discord'

import * as path from 'path'

export const QuackJSUtils = {
  ...Utils,
  YAML,
  Log,
  Discord,
  DB,
}

export class QuackJS implements QuackJSObject {
  public config: QuackJSConfig
  public client: DiscordJS.Client
  public commands: QuackJSCommand[]
  public slashCommands: QuackJSSlashCommand[]
  public triggers: QuackJSTrigger[]
  public events: QuackJSEvent[]
  public files: string[]
  public configs: Record<string, object>
  public modules: QuackJSModule[]
  public variables: Record<string, object>

  private token: string

  constructor(token: string, config: QuackJSConfig) {
    this.token = token
    this.config = config

    this.commands = []
    this.slashCommands = []
    this.events = []
    this.triggers = []
    this.files = []
    this.configs = {}
    this.modules = []
    this.variables = {}

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
        ...this.config.intents,
      ],
    })
  }

  async Start(QuackJS: QuackJS) {
    QuackJSUtils.MkDir('logs')
    QuackJSUtils.MkDir('logs/console')
    QuackJSUtils.MkDir('backups')

    logs.default(QuackJS.client)

    this.CreateEvent({
      name: 'messageCreate',
      execute(client: DiscordJS.Client, message: DiscordJS.Message) {
        if (message.author.bot) return
        if (message.content.startsWith(QuackJS.config.prefix)) {
          const unformattedArgs: string[] = message.content.slice(QuackJS.config.prefix.length).split(/ +/)
          const commandName: string = (unformattedArgs.shift() as string).toLowerCase()

          const generateDobuleQuoteArgs = () => {
            const ar: string[] = []
            let temp = ''

            unformattedArgs.forEach((arg, i) => {
              if (arg[0] === '"') {
                temp += arg.substring(1) + ' '
              } else if (temp && arg[arg.length - 1] !== '"') {
                temp += arg + ' '
              } else if (temp && arg[arg.length - 1] === '"') {
                temp += arg.slice(0, -1)
                ar.push(temp)
                temp = ''
              } else ar.push(arg)

              if (temp && unformattedArgs.length === i + 1) {
                ar.push(...temp.split(' '))
              }
            })

            return ar.filter((a) => a)
          }

          const parseArgs = (ar: string[]) => {
            return ar.map((arg) => {
              const url = QuackJSUtils.Validator('URL', arg) && new URL(arg)
              const num = QuackJSUtils.Validator('Number', arg) && new Number(arg)
              const date = QuackJSUtils.Validator('Date', arg) && new Date(arg)

              if (url) return url
              else if (!isNaN(num as number)) return num
              else if ((date as Date).toString() !== 'Invalid Date') return date
              else return arg
            })
          }

          let args: any[] = QuackJS.config.doubleQuoteArgs ? generateDobuleQuoteArgs() : unformattedArgs
          args = QuackJS.config.parseArgs ? parseArgs(args) : args

          const vars: number[] = [_.findIndex(QuackJS.commands, { name: commandName }), _.findIndex(QuackJS.commands, (e: QuackJSCommand) => e.aliases.includes(commandName))].filter((e) => e !== -1)

          const command: QuackJSCommand = QuackJS.commands[vars[0]] || undefined

          if (command)
            if (command.permission === 'everyone') command.execute(client, message, args)
            else if (message.member?.roles.cache.find((role) => role.id === command.permission || role.name === command.permission)) command.execute(client, message, args)

          return
        }
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

        const i = _.findIndex(QuackJS.slashCommands, {
          name: interaction.commandName,
        })

        if (i === -1) return

        try {
          QuackJS.slashCommands[i].execute(interaction)
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
        console.log('Bot ready.')
        const commandsNames = QuackJS.commands.map((c) => c.name)
        if (new Set(commandsNames).size !== commandsNames.length) Log('Two or more commands have the same name!', 'w')
        ;(async () => {
          if (!client.application?.owner) await client.application?.fetch()

          for (const command of QuackJS.slashCommands) {
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
      QuackJSUtils.DB.authenticate()
    } catch (error: any) {
      QuackJSUtils.Error(new Error(error))
    }

    await this.YAML()
    this.files = (await this.GetFiles()) as string[]
    await this.GetModules(QuackJS)
    await this.StartEvents()
    await this.Login()
  }

  private async YAML() {
    return new Promise((resolve, reject) => {
      for (const conf in this.config.configs) {
        QuackJSUtils.YAML.Generate(conf, this.config.configs[conf])
        const con = QuackJSUtils.YAML.Get(conf)
        if (!con) reject(QuackJSUtils.Error(new Error(`YAML File ${conf} had an error!`)))
        this.configs[conf] = con as object
      }
      if (Object.values(this.config.configs).length === Object.values(this.configs).length) resolve(this.configs)
    })
  }

  private async GetFiles() {
    return new Promise((resolve, reject) => {
      const getAllFiles = (dirPath: string, arrayOfFiles: string[]) => {
        const files = fs.readdirSync(path.join(process.env.PWD as string, dirPath, '/'))
        arrayOfFiles = arrayOfFiles || []
        files.forEach((file: string) => {
          if (fs.statSync(path.join(process.env.PWD as string, dirPath, '/', file)).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(process.env.PWD as string, dirPath, '/', file))
          }
        })
        return arrayOfFiles
      }
      const files: string[] = getAllFiles(`/${this.config.srcDir}`, [])
      if (files) resolve(files)
      else reject(files)
    })
  }

  private async GetModules(QuackJS: QuackJS) {
    return new Promise((resolve, _reject) => {
      QuackJS.files
        // .map((file) => /*'file:\\\\\\' +*/ file.replace(/\.ts/g, '.js'))
        .forEach(async (file, index) => {
          if (!file.endsWith('.js') && !file.endsWith('.ts')) return
          const name = file.substring(0, file.indexOf('.js')).replace(/^.*[\\\/]/, '')
          const module = (await import(file)).default || (await import(file))
          await module(QuackJS)
          QuackJS.modules.push({ name, file, module })
          if (index + 1 === QuackJS.files.length) resolve(QuackJS.files)
        })
    })
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

  public CreateCommand(command: QuackJSCommand) {
    this.commands.push(command)
  }

  public CreateSlash(slashCommand: QuackJSSlashCommand) {
    this.slashCommands.push(slashCommand)
  }

  public CreateEvent(event: QuackJSEvent) {
    this.events.push(event)
  }

  public CreateTrigger(trigger: QuackJSTrigger) {
    this.triggers.push(trigger)
  }
}
