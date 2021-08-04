"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
const Discord = {
    Embed(embed, placeholders) {
        let content = embed.content;
        delete embed.content;
        for (const placeholder in placeholders) {
            const element = placeholders[placeholder];
            content = content === null || content === void 0 ? void 0 : content.replace(new RegExp(placeholder, 'g'), element);
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
            embed = Replacer(embed);
        }
        return {
            embed,
            content,
        };
    },
    Prompt(message, member, options) {
        return new Promise((resolve, reject) => {
            if (options.type === 'message') {
                const filter = (res) => res.author.id === member.id;
                message.channel.awaitMessages(filter, { max: 1 }).then((collected) => {
                    const c = collected.first();
                    resolve(c);
                });
            }
            else if (options.type === 'reaction') {
                if (options.emoji == null)
                    reject(utils_1.default.Error(new Error('Invalid Emoji')));
                const filter = (reaction, user) => user.id === member.id && reaction.emoji.name === options.emoji;
                message.awaitReactions(filter, { max: 1 }).then((collected) => {
                    const c = collected.first();
                    resolve(c);
                });
            }
        });
    },
    CreateRole(guild, options) {
        guild.roles
            .create({
            data: options,
        })
            .then()
            .catch(utils_1.default.Error);
    },
    DeleteRole(guild, finder) {
        const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (roleDeleted == null)
            throw utils_1.default.Error(new Error('Role does not exist'));
        roleDeleted.delete();
    },
    HasRole(member, finder) {
        return member.roles.cache.some((role) => role.name === finder || role.id === finder);
    },
    GiveRole(member, guild, finder) {
        const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (role == null)
            throw utils_1.default.Error(new Error('Role does not exist'));
        return member.roles.add(role);
    },
    RemoveRole(member, guild, finder) {
        const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (role == null)
            throw utils_1.default.Error(new Error('Role does not exist'));
        return member.roles.remove(role);
    },
    CreateChannel(guild, name, options) {
        return guild.channels.create(name, Object.assign({ type: 'text' }, options));
    },
    DeleteChannel(guild, finder) {
        // will be fixed
        // @ts-ignore
        guild.channels.cache
            .find((c) => (c.name === finder || c.id === finder) && c.type === 'text')
            .delete();
    },
    CreateCategory(guild, name, options) {
        return guild.channels.create(name, Object.assign({ type: 'category' }, options));
    },
    DeleteCategory(guild, finder) {
        // will be fixed
        // @ts-ignore
        guild.channels.cache
            .find((c) => (c.name === finder || c.id === finder) && c.type === 'category')
            .delete();
    },
    MoveChannelToCategory(guild, channel, category) {
        const newCategory = guild.channels.cache.find((c) => (c.name === category || c.id === category) && c.type === 'category');
        const newChannel = guild.channels.cache.find((c) => (c.name === channel || c.id === channel) && c.type === 'text');
        if (!newCategory)
            throw utils_1.default.Error(new Error('Category channel does not exist'));
        if (!newChannel)
            throw utils_1.default.Error(new Error('Channel does not exist'));
        newChannel.setParent(newCategory.id);
    },
};
exports.default = Discord;
