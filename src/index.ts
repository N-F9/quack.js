import {
  QuackJSCommand,
  QuackJSConfig,
  QuackJSEvent,
  QuackJSModule,
  QuackJSObject,
} from '../global'
import * as DiscordJS from 'discord.js'
import * as fs from 'fs'
import * as _ from 'lodash'
// import * as logs from 'discord-logs'
// import disbut from 'discord-buttons'

import Utils from './modules/utils'
import Log from './modules/log'
import YAML from './modules/yaml'
// import DB from './modules/database'
import Discord from './modules/discord'
import Variables from './modules/variables'

import * as path from 'path'

export const QuackJSUtils = {
  ...Utils,
  YAML,
  Log,
  Discord,
  Variables,
  // DB
}

export class QuackJS implements QuackJSObject {
  public config: QuackJSConfig
  public client: DiscordJS.Client
  public commands: QuackJSCommand[]
  public events: QuackJSEvent[]
  public files: string[]
  public configs: Record<string, object>
  public modules: QuackJSModule[]

  private token: string

  constructor(token: string, config: QuackJSConfig) {
    this.token = token
    this.config = config

    this.commands = []
    this.events = []
    this.files = []
    this.configs = {}
    this.modules = []

    this.client = new DiscordJS.Client()
  }

  async Start(QuackJS: QuackJS) {
    QuackJSUtils.MkDir('logs')
    QuackJSUtils.MkDir('logs/console')
    QuackJSUtils.MkDir('backups')

    this.CreateEvent({
      name: 'message',
      execute(client: DiscordJS.Client, message: DiscordJS.Message) {
        if (message.author.bot) return
        if (message.content.startsWith(QuackJS.config.prefix)) {
          const args: string[] = message.content
            .slice(QuackJS.config.prefix.length)
            .split(/ +/)
          const commandName: string = (args.shift() as string).toLowerCase()

          const vars: number[] = [
            _.findIndex(QuackJS.commands, { name: commandName }),
            _.findIndex(QuackJS.commands, (e: QuackJSCommand) =>
              e.aliases.includes(commandName),
            ),
          ].filter((e) => e !== -1)

          const command: QuackJSCommand = QuackJS.commands[vars[0]] || undefined

          if (command)
            if (command.permission === 'everyone') command.execute(client, message, args)
            else if (message.member?.roles.cache.array().some(role => role.id == command.permission || role.name == command.permission)) command.execute(client, message, args)

          return
        }
      },
    })

    this.CreateEvent({
      name: 'ready',
      execute(client: DiscordJS.Client) {
        console.log('Bot ready.')
      },
    })

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
        if (!con)
          reject(
            QuackJSUtils.Error(new Error(`YAML File ${conf} had an error!`)),
          )
        this.configs[conf] = con as object
      }
      if (
        Object.values(this.config.configs).length ===
        Object.values(this.configs).length
      )
        resolve(this.configs)
    })
  }

  private async GetFiles() {
    return new Promise((resolve, reject) => {
      const getAllFiles = (dirPath: string, arrayOfFiles: string[]) => {
        const files = fs.readdirSync(path.join(__dirname, dirPath, '/'))
        arrayOfFiles = arrayOfFiles || []
        files.forEach((file: string) => {
          if (
            fs.statSync(path.join(__dirname, dirPath, '/', file)).isDirectory()
          ) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
          }
        })
        return arrayOfFiles
      }
      const files: string[] = getAllFiles(`../${this.config.srcDir}`, [])
      if (files) resolve(files)
      else reject(files)
    })
  }

  private async GetModules(QuackJS: QuackJS) {
    return new Promise((resolve, _reject) => {
      let c = 0
      QuackJS.files
        // .map((file) => /*'file:\\\\\\' +*/ file.replace(/\.ts/g, '.js'))
        .forEach(async (file, _index) => {
          if (!file.endsWith('.js')) return
          const name = file
            .substring(0, file.indexOf('.js'))
            .replace(/^.*[\\\/]/, '')
          const module = (await import(file)).default || (await import(file))
          await module(QuackJS)
          QuackJS.modules.push({ name, file, module })
          c++
          if (c === QuackJS.files.length) resolve(QuackJS.files)
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

  public CreateEvent(event: QuackJSEvent) {
    this.events.push(event)
  }
}
