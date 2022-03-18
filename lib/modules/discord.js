import { Exception } from './functions.js';
/**
 * A function for generating an embed with ease.
 *
 * @param message - The message object to be generated from.
 * @param placeholders - The placerholders to be replaced within the `message`.
 * @returns The formatted Discord Message Options.
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
        if (message.embeds)
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
 * @param message - The message object to be used.
 * @param member - The member to be prompted.
 * @param options - The option of the prompt.
 * @returns A promise which resolves the input the user gave.
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
                Exception(new Error('Invalid Emoji'));
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
 * @param guild - The guild which will be modified.
 * @param options - The option for the new role.
 */
export const CreateRole = (guild, options) => {
    guild.roles.create(options).then().catch(Error);
};
/**
 * A function for deleting roles.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export const DeleteRole = (guild, finder) => {
    const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
    if (roleDeleted == null)
        Exception(new Error('Role does not exist!'));
    roleDeleted?.delete();
};
/**
 * A function for checking if a user has a role.
 *
 * @param member - The memeber which will be check.
 * @param finder - The parameter which the function will search for.
 * @returns `true` if the user has the role and `false` if the user doesn't have the role.
 */
export const HasRole = (member, finder) => {
    return member.roles.cache.some((role) => role.name === finder || role.id === finder);
};
/**
 * A function for giving a user a role.
 *
 * @param guild - The guild which will be modified.
 * @param member - The member which will be given the role.
 * @param finder - The parameter for finding roles.
 * @returns A boolean whether or not the user was given the role.
 */
export const GiveRole = (guild, member, finder) => {
    const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
    if (role == null)
        Exception(new Error('Role does not exist!'));
    return member.roles.add(role);
};
/**
 * A function for removing a role from a user.
 *
 * @param guild - The guild which will be modified.
 * @param member - The member which will be removed from the role.
 * @param finder - The parameter for finding roles.
 * @returns A boolean whether or not the user was given the role.
 */
export const RemoveRole = (guild, member, finder) => {
    const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
    if (role == null)
        Exception(new Error('Role does not exist'));
    return member.roles.remove(role);
};
/**
 * A function for creating a channel.
 *
 * @param guild - The guild which will be modified.
 * @param name - The name of the text channel.
 * @param options - The options for the text channel.
 * @returns The text channel.
 */
export const CreateChannel = (guild, name, options) => {
    return guild.channels.create(name, {
        type: 'GUILD_TEXT',
        ...options,
    });
};
/**
 * A function for deleting a channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export const DeleteChannel = (guild, finder) => {
    const channel = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_TEXT');
    if (channel == null)
        Exception(new Error('Channel does not exist'));
    channel?.delete();
};
/**
 * A function for creating category channels.
 *
 * @param guild - The guild which will be modified.
 * @param name - The name of the category.
 * @param options - The options for the category.
 * @returns The category channel.
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
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export const DeleteCategory = (guild, finder) => {
    const category = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_CATEGORY');
    if (category == null)
        Exception(new Error('Category does not exist'));
    category?.delete();
};
/**
 * A function for getting a channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 * @returns The channel.
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
 * A function for moving a channel to a category.
 *
 * @param guild - The guild which will be modified.
 * @param channel - The channel to be moved to the `category`.
 * @param category - The category which the `channel` will be moved to.
 */
export const MoveChannelToCategory = (guild, channel, category) => {
    const newCategory = GetChannel(guild, category);
    const newChannel = GetChannel(guild, channel);
    if (!newCategory)
        Exception(new Error('Category does not exist!'));
    if (!newChannel)
        Exception(new Error('Channel does not exist!'));
    newChannel.setParent(newCategory.id);
};
/**
 * An object for the limits of Discord.
 */
export const LIMITS = {
    EMBED: {
        TITLE: 256,
        DESCRIPTION: 4096,
        FIELDS: 25,
        FIELD: {
            NAME: 256,
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
        EMBED: 6000,
        EMBEDS: 10,
        CONTENT: 2000, // Characters
    },
};
