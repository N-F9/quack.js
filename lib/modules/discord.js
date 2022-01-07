"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
const locale_1 = __importDefault(require("../handlers/locale"));
const Discord = {
    Embed(message, placeholders) {
        let content = message.content;
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
                    (() => __awaiter(this, void 0, void 0, function* () { return reject(utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.emoji))); }))();
                const filter = (reaction, user) => user.id === member.id && reaction.emoji.name === options.emoji;
                message.awaitReactions({ filter, max: 1 }).then((collected) => {
                    const c = collected.first();
                    resolve(c);
                });
            }
        });
    },
    CreateRole(guild, options) {
        guild.roles.create(options).then().catch(utils_1.default.Error);
    },
    DeleteRole(guild, finder) {
        const roleDeleted = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (roleDeleted == null)
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.role)); }))();
        roleDeleted === null || roleDeleted === void 0 ? void 0 : roleDeleted.delete();
    },
    HasRole(member, finder) {
        return member.roles.cache.some((role) => role.name === finder || role.id === finder);
    },
    GiveRole(guild, member, finder) {
        const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (role == null)
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.role)); }))();
        return member.roles.add(role);
    },
    RemoveRole(guild, member, finder) {
        const role = guild.roles.cache.find((role) => role.name === finder || role.id === finder);
        if (role == null)
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.role)); }))();
        return member.roles.remove(role);
    },
    CreateChannel(guild, name, options) {
        return guild.channels.create(name, Object.assign({ type: 'GUILD_TEXT' }, options));
    },
    DeleteChannel(guild, finder) {
        const channel = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_TEXT');
        if (channel == null)
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.channel)); }))();
        channel === null || channel === void 0 ? void 0 : channel.delete();
    },
    CreateCategory(guild, name, options) {
        return guild.channels.create(name, Object.assign({ type: 'GUILD_CATEGORY' }, options));
    },
    DeleteCategory(guild, finder) {
        const category = guild.channels.cache.find((c) => (c.name === finder || c.id === finder) && c.type === 'GUILD_CATEGORY');
        if (category == null)
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.category)); }))();
        category === null || category === void 0 ? void 0 : category.delete();
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
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.category)); }))();
        if (!newChannel)
            (() => __awaiter(this, void 0, void 0, function* () { return utils_1.default.Error(new Error((yield (0, locale_1.default)()).discord.errors.channel)); }))();
        newChannel.setParent(newCategory.id);
    },
};
exports.default = Discord;
