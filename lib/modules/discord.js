import Utils from './utils.js';
import Locale from '../handlers/locale.js';
const Discord = {
    Embed(message, placeholders) {
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
    },
    Prompt(message, member, options) {
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
                    (async () => reject(Utils.Error(new Error(Locale().discord.errors.emoji))))();
                const filter = (reaction, user) => user.id === member.id && reaction.emoji.name === options.emoji;
                message.awaitReactions({ filter, max: 1 }).then((collected) => {
                    const c = collected.first();
                    resolve(c);
                });
            }
        });
    },
    CreateRole(guild, options) {
        guild.roles.create(options).then().catch(Utils.Error);
    },
    DeleteRole(guild, finder) {
        const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (roleDeleted == null)
            (async () => Utils.Error(new Error(Locale().discord.errors.role)))();
        roleDeleted?.delete();
    },
    HasRole(member, finder) {
        return member.roles.cache.some((role) => role.name === finder || role.id === finder);
    },
    GiveRole(guild, member, finder) {
        const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (role == null)
            (async () => Utils.Error(new Error(Locale().discord.errors.role)))();
        return member.roles.add(role);
    },
    RemoveRole(guild, member, finder) {
        const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (role == null)
            (async () => Utils.Error(new Error(Locale().discord.errors.role)))();
        return member.roles.remove(role);
    },
    CreateChannel(guild, name, options) {
        return guild.channels.create(name, {
            type: 'GUILD_TEXT',
            ...options,
        });
    },
    DeleteChannel(guild, finder) {
        const channel = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_TEXT');
        if (channel == null)
            (async () => Utils.Error(new Error(Locale().discord.errors.channel)))();
        channel?.delete();
    },
    CreateCategory(guild, name, options) {
        return guild.channels.create(name, {
            type: 'GUILD_CATEGORY',
            ...options,
        });
    },
    DeleteCategory(guild, finder) {
        const category = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_CATEGORY');
        if (category == null)
            (async () => Utils.Error(new Error(Locale().discord.errors.category)))();
        category?.delete();
    },
    GetChannel(guild, finder) {
        let channel;
        if (typeof finder === 'string')
            channel = guild.channels.cache.find((c) => c.name === finder || c.id === finder);
        else
            channel = guild.channels.cache.find((c) => c.id === finder.id);
        return channel;
    },
    MoveChannelToCategory(guild, channel, category) {
        const newCategory = this.GetChannel(guild, category);
        const newChannel = this.GetChannel(guild, channel);
        if (!newCategory)
            (async () => Utils.Error(new Error(Locale().discord.errors.category)))();
        if (!newChannel)
            (async () => Utils.Error(new Error(Locale().discord.errors.channel)))();
        newChannel.setParent(newCategory.id);
    },
};
export default Discord;
