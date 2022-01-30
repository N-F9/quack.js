import { Exception } from './functions.js';
import { Locale } from '../handlers/locale.js';
/**
 * A function for generating an embed with ease.
 *
 * @param {QuackJSMessage} message
 * @param {Record<string, any>} [placeholders]
 * @return {*}  {DiscordJS.MessageOptions}
 */
export const Embed = (message, placeholders) => {
    let content = message.content;
    for (const placeholder in placeholders) {
        const element = placeholders[placeholder];
        content = content?.replace(new RegExp(placeholder, 'g'), element);
        const Replacer = (obj) => {
            const keys = Object.keys(obj);
            for (const key of keys) {
                if (typeof obj[key] === 'string')
                    obj[key] = obj[key].replace(new RegExp(placeholder, 'g'), element);
                else if (typeof obj[key] === 'object')
                    obj[key] = Replacer(obj[key]);
            }
            return obj;
        };
        for (const [i, embed] of message.embeds.entries()) {
            message.embeds[i] = Replacer(embed);
        }
    }
    return {
        embeds: message.embeds,
        content,
        files: message.files,
        components: message.components,
    };
};
/**
 * A function for prompting the user for input; either from a message input or a reaction input.
 *
 * @param {DiscordJS.Message} message
 * @param {DiscordJS.GuildMember} member
 * @param {QuackJSPromptOptions} options
 * @return {*}  {(Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined>)}
 */
export const Prompt = (message, member, options) => {
    return new Promise((resolve, reject) => {
        if (options.type === 'message') {
            const filter = (res) => res.author.id === member.id;
            message.channel.awaitMessages({ filter, max: 1 }).then((collected) => {
                const c = collected.first();
                resolve(c);
            });
        }
        else if (options.type === 'reaction') {
            if (options.emoji == null)
                (async () => reject(Exception(new Error(Locale().discord.errors.emoji))))();
            const filter = (reaction, user) => user.id === member.id && reaction.emoji.name === options.emoji;
            message.awaitReactions({ filter, max: 1 }).then((collected) => {
                const c = collected.first();
                resolve(c);
            });
        }
    });
};
/**
 * A function for creating roles.
 *
 * @param {DiscordJS.Guild} guild
 * @param {DiscordJS.CreateRoleOptions} options
 */
export const CreateRole = (guild, options) => {
    guild.roles.create(options).then().catch(Error);
};
/**
 * A function for deleting roles.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} finder
 */
export const DeleteRole = (guild, finder) => {
    const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
    if (roleDeleted == null)
        (async () => Exception(new Error(Locale().discord.errors.role)))();
    roleDeleted?.delete();
};
/**
 * A function for checking if a user has a role.
 *
 * @param {DiscordJS.GuildMember} member
 * @param {string} finder
 * @return {*}  {boolean}
 */
export const HasRole = (member, finder) => {
    return member.roles.cache.some((role) => role.name === finder || role.id === finder);
};
/**
 * A function for giving a user a role.
 *
 * @param {DiscordJS.Guild} guild
 * @param {DiscordJS.GuildMember} member
 * @param {string} finder
 * @return {*}  {Promise<DiscordJS.GuildMember>}
 */
export const GiveRole = (guild, member, finder) => {
    const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
    if (role == null)
        (async () => Exception(new Error(Locale().discord.errors.role)))();
    return member.roles.add(role);
};
/**
 * A function for removing a role from a user.
 *
 * @param {DiscordJS.Guild} guild
 * @param {DiscordJS.GuildMember} member
 * @param {string} finder
 * @return {*}  {Promise<DiscordJS.GuildMember>}
 */
export const RemoveRole = (guild, member, finder) => {
    const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
    if (role == null)
        (async () => Exception(new Error(Locale().discord.errors.role)))();
    return member.roles.remove(role);
};
/**
 * A function for creating a channel.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} name
 * @param {DiscordJS.GuildChannelCreateOptions} options
 * @return {*}  {Promise<DiscordJS.TextChannel>}
 */
export const CreateChannel = (guild, name, options) => {
    return guild.channels.create(name, {
        type: 'GUILD_TEXT',
        ...options,
    });
};
/**
 * A function for deleting a channel
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} finder
 */
export const DeleteChannel = (guild, finder) => {
    const channel = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_TEXT');
    if (channel == null)
        (async () => Exception(new Error(Locale().discord.errors.channel)))();
    channel?.delete();
};
/**
 * A function for creating category channels.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} name
 * @param {Object} options
 * @return {*}  {Promise<DiscordJS.CategoryChannel>}
 */
export const CreateCategory = (guild, name, options) => {
    return guild.channels.create(name, {
        type: 'GUILD_CATEGORY',
        ...options,
    });
};
/**
 * A function for deleting a category channel.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} finder
 */
export const DeleteCategory = (guild, finder) => {
    const category = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_CATEGORY');
    if (category == null)
        (async () => Exception(new Error(Locale().discord.errors.category)))();
    category?.delete();
};
/**
 * A function for getting a channel
 *
 * @param {DiscordJS.Guild} guild
 * @param {(string | DiscordJS.Channel)} finder
 * @return {*}  {(DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined)}
 */
export const GetChannel = (guild, finder) => {
    let channel;
    if (typeof finder === 'string')
        channel = guild.channels.cache.find((c) => c.name === finder || c.id === finder);
    else
        channel = guild.channels.cache.find((c) => c.id === finder.id);
    return channel;
};
/**
 * A function for moving a channel to a category
 *
 * @param {DiscordJS.Guild} guild
 * @param {(string | DiscordJS.Channel)} channel
 * @param {(string | DiscordJS.CategoryChannel)} category
 */
export const MoveChannelToCategory = (guild, channel, category) => {
    const newCategory = GetChannel(guild, category);
    const newChannel = GetChannel(guild, channel);
    if (!newCategory)
        (async () => Exception(new Error(Locale().discord.errors.category)))();
    if (!newChannel)
        (async () => Exception(new Error(Locale().discord.errors.channel)))();
    newChannel.setParent(newCategory.id);
};
