import * as DiscordJS from 'discord.js'
import { QuackJSEmbed, QuackJSPromptOptions } from '../../global'
import Utils from './utils'

const Discord = {
  Embed(embed: QuackJSEmbed, placeholders?: Record<string, any>) {
    let content = embed.content
    delete embed.content

    for (const placeholder in placeholders) {
      const element = placeholders[placeholder]
      content = content?.replace(new RegExp(placeholder, 'g'), element)

      const Replacer = (obj: Record<string, any>) => {
        const keys = Object.keys(obj)
        for (const key of keys) {
          if (typeof obj[key] === 'string')
            obj[key] = obj[key].replace(new RegExp(placeholder, 'g'), element)
          else if (typeof obj[key] === 'object') obj[key] = Replacer(obj[key])
        }
        return obj
      }
      embed = Replacer(embed)
    }

    return {
      embed,
      content,
    }
  },
  Prompt(
    message: DiscordJS.Message,
    member: DiscordJS.GuildMember,
    options: QuackJSPromptOptions,
  ) {
    return new Promise((resolve, reject) => {
      if (options.type === 'message') {
        const filter = (res: DiscordJS.Message) => res.author.id === member.id
        message.channel.awaitMessages(filter, { max: 1 }).then((collected) => {
          const c = collected.first()
          resolve(c)
        })
      } else if (options.type === 'reaction') {
        if (options.emoji == null)
          reject(Utils.Error(new Error('Invalid Emoji')))
        const filter = (
          reaction: DiscordJS.MessageReaction,
          user: DiscordJS.User,
        ) => user.id === member.id && reaction.emoji.name === options.emoji

        message.awaitReactions(filter, { max: 1 }).then((collected) => {
          const c = collected.first()
          resolve(c)
        })
      }
    })
  },
  CreateRole(guild: DiscordJS.Guild, options: Object) {
    guild.roles
      .create({
        data: options,
      })
      .then()
      .catch(Utils.Error)
  },

  DeleteRole(guild: DiscordJS.Guild, finder: string | number) {
    const roleDeleted = guild.roles.cache.find(
      (role) => role.name === finder || role.id === finder,
    )
    if (roleDeleted == null) throw Utils.Error(new Error('Role does not exist'))
    roleDeleted.delete()
  },

  HasRole(member: DiscordJS.GuildMember, finder: string | number): Boolean {
    return member.roles.cache.some(
      (role) => role.name === finder || role.id === finder,
    )
  },

  GiveRole(
    member: DiscordJS.GuildMember,
    guild: DiscordJS.Guild,
    finder: string | number,
  ) {
    const role = guild.roles.cache.find(
      (role) => role.name === finder || role.id === finder,
    )
    if (role == null) throw Utils.Error(new Error('Role does not exist'))
    return member.roles.add(role)
  },

  RemoveRole(
    member: DiscordJS.GuildMember,
    guild: DiscordJS.Guild,
    finder: string | number,
  ) {
    const role = guild.roles.cache.find(
      (role) => role.name === finder || role.id === finder,
    )
    if (role == null) throw Utils.Error(new Error('Role does not exist'))
    return member.roles.remove(role)
  },

  CreateChannel(guild: DiscordJS.Guild, name: string, options: Object) {
    return guild.channels.create(name, {
      type: 'text',
      ...options,
    })
  },

  DeleteChannel(guild: DiscordJS.Guild, finder: string | number) {
    // will be fixed
    // @ts-ignore
    guild.channels.cache
      .find((c) => (c.name === finder || c.id === finder) && c.type === 'text')
      .delete()
  },

  CreateCategory(guild: DiscordJS.Guild, name: string, options: Object) {
    return guild.channels.create(name, {
      type: 'category',
      ...options,
    })
  },

  DeleteCategory(guild: DiscordJS.Guild, finder: string | number) {
    // will be fixed
    // @ts-ignore
    guild.channels.cache
      .find(
        (c) => (c.name === finder || c.id === finder) && c.type === 'category',
      )
      .delete()
  },

  MoveChannelToCategory(
    guild: DiscordJS.Guild,
    channel: string | number,
    category: string | number,
  ) {
    const newCategory = guild.channels.cache.find(
      (c) =>
        (c.name === category || c.id === category) && c.type === 'category',
    )
    const newChannel = guild.channels.cache.find(
      (c) => (c.name === channel || c.id === channel) && c.type === 'text',
    )

    if (!newCategory)
      throw Utils.Error(new Error('Category channel does not exist'))
    if (!newChannel) throw Utils.Error(new Error('Channel does not exist'))
    newChannel.setParent(newCategory.id)
  },
}

export default Discord
