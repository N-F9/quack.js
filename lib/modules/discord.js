"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Discord = {
    Embed: function (embed) {
        var content = embed.content;
        delete embed.content;
        return {
            embed: embed,
            content: content
        };
    },
    Prompt: function (message, member, options) {
        return new Promise(function (resolve, reject) {
            if (options.type === 'message') {
                console.log('1');
                var filter = function (res) {
                    console.log(res.author.id, member.id);
                    return res.author.id == member.id;
                };
                console.log('2');
                message.channel.awaitMessages(filter, { max: 1 })
                    .then(function (collected) {
                    var c = collected.first();
                    console.log(c);
                    resolve(c);
                });
            }
            else if (options.type === 'reaction') {
                if (options.emoji == null)
                    reject(utils_1.default.Error(new Error('Invalid Emoji')));
                var filter = function (reaction, user) { return user.id == member.id && reaction.emoji.name === options.emoji; };
                message.awaitReactions(filter, { max: 1 })
                    .then(function (collected) {
                    var c = collected.first();
                    resolve(c);
                });
            }
        });
    },
    CreateRole: function (guild, options) {
        guild.roles
            .create({
            data: options,
        })
            .then()
            .catch(utils_1.default.Error);
    },
    DeleteRole: function (guild, finder) {
        var roleDeleted = guild.roles.cache.find(function (role) { return role.name === finder || role.id === finder; });
        if (roleDeleted == null)
            throw utils_1.default.Error(new Error('Role does not exist'));
        roleDeleted.delete();
    },
    HasRole: function (member, finder) {
        return member.roles.cache.some(function (role) { return role.name === finder || role.id === finder; });
    },
    GiveRole: function (member, guild, finder) {
        var role = guild.roles.cache.find(function (role) { return role.name === finder || role.id === finder; });
        if (role == null)
            throw utils_1.default.Error(new Error('Role does not exist'));
        return member.roles.add(role);
    },
    RemoveRole: function (member, guild, finder) {
        var role = guild.roles.cache.find(function (role) { return role.name === finder || role.id === finder; });
        if (role == null)
            throw utils_1.default.Error(new Error('Role does not exist'));
        return member.roles.remove(role);
    },
    CreateChannel: function (guild, name, options) {
        return guild.channels.create(name, __assign({ type: 'text' }, options));
    },
    DeleteChannel: function (guild, finder) {
        // will be fixed
        // @ts-ignore
        guild.channels.cache.find(function (c) { return (c.name === finder || c.id === finder) && c.type === 'text'; })
            .delete();
    },
    CreateCategory: function (guild, name, options) {
        return guild.channels.create(name, __assign({ type: 'category' }, options));
    },
    DeleteCategory: function (guild, finder) {
        // will be fixed 
        // @ts-ignore
        guild.channels.cache
            .find(function (c) { return (c.name === finder || c.id === finder) && c.type === 'category'; })
            .delete();
    },
    MoveChannelToCategory: function (guild, channel, category) {
        var newCategory = guild.channels.cache.find(function (c) {
            return (c.name === category || c.id === category) && c.type === 'category';
        });
        var newChannel = guild.channels.cache.find(function (c) { return (c.name === channel || c.id === channel) && c.type === 'text'; });
        if (!newCategory)
            throw utils_1.default.Error(new Error('Category channel does not exist'));
        if (!newChannel)
            throw utils_1.default.Error(new Error('Channel does not exist'));
        newChannel.setParent(newCategory.id);
    },
};
exports.default = Discord;
