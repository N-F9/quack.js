import { QuackJSMessage, QuackJSPromptOptions } from '../../global'

import * as DiscordJS from 'discord.js'
import { Exception } from './functions.js'

/**
 * A function for generating an embed with ease.
 *
 * @param message - The message object to be generated from.
 * @param placeholders - The placerholders to be replaced within the `message`.
 * @returns The formatted Discord Message Options.
 */
export const Embed = (message: QuackJSMessage, placeholders?: Record<string, any>): DiscordJS.MessageOptions => {
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

		if (message.embeds)
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
}

/**
 * A function for prompting the user for input; either from a message input or a reaction input.
 *
 * @param message - The message object to be used.
 * @param member - The member to be prompted.
 * @param options - The option of the prompt.
 * @returns A promise which resolves the input the user gave.
 */
export const Prompt = (message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions): Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined> => {
	return new Promise((resolve, reject) => {
		if (options.type === 'message') {
			const filter = (res: DiscordJS.Message) => res.author.id === member.id
			message.channel.awaitMessages({ filter, max: 1 }).then((collected) => {
				const c = collected.first()
				resolve(c)
			})
		} else if (options.type === 'reaction') {
			if (options.emoji == null) Exception(new Error('Invalid Emoji'))
			const filter = (reaction: DiscordJS.MessageReaction, user: DiscordJS.User) => user.id === member.id && reaction.emoji.name === options.emoji

			message.awaitReactions({ filter, max: 1 }).then((collected) => {
				const c = collected.first()
				resolve(c)
			})
		}
	})
}

/**
 * A function for creating roles.
 *
 * @param guild - The guild which will be modified.
 * @param options - The option for the new role.
 */
export const CreateRole = (guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions) => {
	guild.roles.create(options).then().catch(Error)
}

/**
 * A function for deleting roles.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export const DeleteRole = (guild: DiscordJS.Guild, finder: string) => {
	const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder)
	if (roleDeleted == null) Exception(new Error('Role does not exist!'))
	roleDeleted?.delete()
}

/**
 * A function for checking if a user has a role.
 *
 * @param member - The memeber which will be check.
 * @param finder - The parameter which the function will search for.
 * @returns `true` if the user has the role and `false` if the user doesn't have the role.
 */
export const HasRole = (member: DiscordJS.GuildMember, finder: string): boolean => {
	return member.roles.cache.some((role) => role.name === finder || role.id === finder)
}

/**
 * A function for giving a user a role.
 *
 * @param guild - The guild which will be modified.
 * @param member - The member which will be given the role.
 * @param finder - The parameter for finding roles.
 * @returns A boolean whether or not the user was given the role.
 */
export const GiveRole = (guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember> => {
	const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder)
	if (role == null) Exception(new Error('Role does not exist!'))
	return member.roles.add(role as DiscordJS.Role)
}

/**
 * A function for removing a role from a user.
 *
 * @param guild - The guild which will be modified.
 * @param member - The member which will be removed from the role.
 * @param finder - The parameter for finding roles.
 * @returns A boolean whether or not the user was given the role.
 */
export const RemoveRole = (guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember> => {
	const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder)
	if (role == null) Exception(new Error('Role does not exist'))
	return member.roles.remove(role as DiscordJS.Role)
}

/**
 * A function for creating a channel.
 *
 * @param guild - The guild which will be modified.
 * @param name - The name of the text channel.
 * @param options - The options for the text channel.
 * @returns The text channel.
 */
export const CreateChannel = (guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions): Promise<DiscordJS.TextChannel> => {
	return guild.channels.create(name, {
		type: 'GUILD_TEXT',
		...options,
	}) as Promise<DiscordJS.TextChannel>
}

/**
 * A function for deleting a channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export const DeleteChannel = (guild: DiscordJS.Guild, finder: string) => {
	const channel = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_TEXT')
	if (channel == null) Exception(new Error('Channel does not exist'))
	channel?.delete()
}

/**
 * A function for creating category channels.
 *
 * @param guild - The guild which will be modified.
 * @param name - The name of the category.
 * @param options - The options for the category.
 * @returns The category channel.
 */
export const CreateCategory = (guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions): Promise<DiscordJS.CategoryChannel> => {
	return guild.channels.create(name, {
		type: 'GUILD_CATEGORY',
		...options,
	}) as Promise<DiscordJS.CategoryChannel>
}

/**
 * A function for deleting a category channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export const DeleteCategory = (guild: DiscordJS.Guild, finder: string) => {
	const category = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_CATEGORY')
	if (category == null) Exception(new Error('Category does not exist'))
	category?.delete()
}

/**
 * A function for getting a channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 * @returns The channel.
 */
export const GetChannel = (guild: DiscordJS.Guild, finder: string | DiscordJS.Channel): DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined => {
	let channel: DiscordJS.GuildChannel | DiscordJS.ThreadChannel | undefined
	if (typeof finder === 'string') channel = guild.channels.cache.find((c) => c.name === finder || c.id === finder)
	else channel = guild.channels.cache.find((c) => c.id === finder.id)
	return channel
}

/**
 * A function for moving a channel to a category.
 *
 * @param guild - The guild which will be modified.
 * @param channel - The channel to be moved to the `category`.
 * @param category - The category which the `channel` will be moved to.
 */
export const MoveChannelToCategory = (guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel) => {
	const newCategory = GetChannel(guild, category)
	const newChannel = GetChannel(guild, channel)

	if (!newCategory) Exception(new Error('Category does not exist!'))
	if (!newChannel) Exception(new Error('Channel does not exist!'))
	;(newChannel as DiscordJS.GuildChannel).setParent((newCategory as DiscordJS.CategoryChannel).id)
}

/**
 * An object for the limits of Discord.
 */
export const LIMITS = {
	EMBED: {
		TITLE: 256, // Characters
		DESCRIPTION: 4096, // Characters
		FIELDS: 25, // Number of fields
		FIELD: {
			NAME: 256, // Characters
			VALUE: 1024, // Characters
		},
		FOOTER: {
			TEXT: 2048, // Characters
		},
		AUTHOR: {
			NAME: 256, // Characters
		},
	},
	MESSAGE: {
		EMBED: 6000, // Total characters of all embeds
		EMBEDS: 10, // Total number of embeds per message
		CONTENT: 2000, // Characters
	},
}
