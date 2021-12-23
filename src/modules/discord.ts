import { QuackJSMessage, QuackJSPromptOptions } from '../../global'

import * as DiscordJS from 'discord.js'
import Utils from './utils'

const Discord = {
	Embed(message: QuackJSMessage, placeholders?: Record<string, any>): DiscordJS.MessageOptions {
		let content = message.content

		for (const placeholder in placeholders) {
			const element = placeholders[placeholder]
			content = content?.replace(new RegExp(placeholder, 'g'), element)

			const Replacer = (obj: Record<string, any>) => {
				const keys = Object.keys(obj)
				for (const key of keys) {
					if (typeof obj[key] === 'string') obj[key] = obj[key].replace(new RegExp(placeholder, 'g'), element)
					else if (typeof obj[key] === 'object') obj[key] = Replacer(obj[key])
				}
				return obj
			}

			for (const [i, embed] of message.embeds.entries()) {
				message.embeds[i] = Replacer(embed)
			}
		}

		return {
			embeds: message.embeds as unknown as DiscordJS.MessageEmbed[],
			content,
			files: message.files,
			components: message.components,
		}
	},

	Prompt(message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions) {
		return new Promise((resolve, reject) => {
			if (options.type === 'message') {
				const filter = (res: DiscordJS.Message) => res.author.id === member.id
				message.channel.awaitMessages({ filter, max: 1 }).then((collected) => {
					const c = collected.first()
					resolve(c)
				})
			} else if (options.type === 'reaction') {
				if (options.emoji == null) reject(Utils.Error(new Error('Invalid Emoji')))
				const filter = (reaction: DiscordJS.MessageReaction, user: DiscordJS.User) => user.id === member.id && reaction.emoji.name === options.emoji

				message.awaitReactions({ filter, max: 1 }).then((collected) => {
					const c = collected.first()
					resolve(c)
				})
			}
		})
	},

	CreateRole(guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions) {
		guild.roles.create(options).then().catch(Utils.Error)
	},

	DeleteRole(guild: DiscordJS.Guild, finder: string) {
		const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder)
		if (roleDeleted == null) throw Utils.Error(new Error('Role does not exist'))
		roleDeleted.delete()
	},

	HasRole(member: DiscordJS.GuildMember, finder: string): Boolean {
		return member.roles.cache.some((role) => role.name === finder || role.id === finder)
	},

	GiveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string) {
		const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder)
		if (role == null) throw Utils.Error(new Error('Role does not exist'))
		return member.roles.add(role)
	},

	RemoveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string) {
		const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder)
		if (role == null) throw Utils.Error(new Error('Role does not exist'))
		return member.roles.remove(role)
	},

	CreateChannel(guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions) {
		return guild.channels.create(name, {
			type: 'GUILD_TEXT',
			...options,
		})
	},

	DeleteChannel(guild: DiscordJS.Guild, finder: string) {
		const channel = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_TEXT')
		if (channel == null) throw Utils.Error(new Error('Channel does not exist'))
		channel?.delete()
	},

	CreateCategory(guild: DiscordJS.Guild, name: string, options: Object) {
		return guild.channels.create(name, {
			type: 'GUILD_CATEGORY',
			...options,
		})
	},

	DeleteCategory(guild: DiscordJS.Guild, finder: string) {
		const category = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_CATEGORY')
		if (category == null) throw Utils.Error(new Error('Category does not exist'))
		category?.delete()
	},

	GetChannel(guild: DiscordJS.Guild, finder: string | DiscordJS.Channel) {
		let channel: DiscordJS.GuildChannel | DiscordJS.ThreadChannel | undefined
		if (typeof finder === 'string') channel = guild.channels.cache.find((c) => c.name === finder || c.id === finder)
		else channel = guild.channels.cache.find((c) => c.id === finder.id)
		return channel
	},

	MoveChannelToCategory(guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel) {
		const newCategory = this.GetChannel(guild, category)
		const newChannel = this.GetChannel(guild, channel)

		if (!newCategory) throw Utils.Error(new Error('Category channel does not exist'))
		if (!newChannel) throw Utils.Error(new Error('Channel does not exist'))
		;(newChannel as DiscordJS.GuildChannel).setParent(newCategory.id)
	},
}

export default Discord
