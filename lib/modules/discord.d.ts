import { QuackJSMessage, QuackJSPromptOptions } from '../../global';
import * as DiscordJS from 'discord.js';
/**
 * A function for generating an embed with ease.
 *
 * @param {QuackJSMessage} message
 * @param {Record<string, any>} [placeholders]
 * @return {*}  {DiscordJS.MessageOptions}
 */
export declare const Embed: (message: QuackJSMessage, placeholders?: Record<string, any> | undefined) => DiscordJS.MessageOptions;
/**
 * A function for prompting the user for input; either from a message input or a reaction input.
 *
 * @param {DiscordJS.Message} message
 * @param {DiscordJS.GuildMember} member
 * @param {QuackJSPromptOptions} options
 * @return {*}  {(Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined>)}
 */
export declare const Prompt: (message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions) => Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined>;
/**
 * A function for creating roles.
 *
 * @param {DiscordJS.Guild} guild
 * @param {DiscordJS.CreateRoleOptions} options
 */
export declare const CreateRole: (guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions) => void;
/**
 * A function for deleting roles.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} finder
 */
export declare const DeleteRole: (guild: DiscordJS.Guild, finder: string) => void;
/**
 * A function for checking if a user has a role.
 *
 * @param {DiscordJS.GuildMember} member
 * @param {string} finder
 * @return {*}  {boolean}
 */
export declare const HasRole: (member: DiscordJS.GuildMember, finder: string) => boolean;
/**
 * A function for giving a user a role.
 *
 * @param {DiscordJS.Guild} guild
 * @param {DiscordJS.GuildMember} member
 * @param {string} finder
 * @return {*}  {Promise<DiscordJS.GuildMember>}
 */
export declare const GiveRole: (guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string) => Promise<DiscordJS.GuildMember>;
/**
 * A function for removing a role from a user.
 *
 * @param {DiscordJS.Guild} guild
 * @param {DiscordJS.GuildMember} member
 * @param {string} finder
 * @return {*}  {Promise<DiscordJS.GuildMember>}
 */
export declare const RemoveRole: (guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string) => Promise<DiscordJS.GuildMember>;
/**
 * A function for creating a channel.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} name
 * @param {DiscordJS.GuildChannelCreateOptions} options
 * @return {*}  {Promise<DiscordJS.TextChannel>}
 */
export declare const CreateChannel: (guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions) => Promise<DiscordJS.TextChannel>;
/**
 * A function for deleting a channel
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} finder
 */
export declare const DeleteChannel: (guild: DiscordJS.Guild, finder: string) => void;
/**
 * A function for creating category channels.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} name
 * @param {Object} options
 * @return {*}  {Promise<DiscordJS.CategoryChannel>}
 */
export declare const CreateCategory: (guild: DiscordJS.Guild, name: string, options: Object) => Promise<DiscordJS.CategoryChannel>;
/**
 * A function for deleting a category channel.
 *
 * @param {DiscordJS.Guild} guild
 * @param {string} finder
 */
export declare const DeleteCategory: (guild: DiscordJS.Guild, finder: string) => void;
/**
 * A function for getting a channel
 *
 * @param {DiscordJS.Guild} guild
 * @param {(string | DiscordJS.Channel)} finder
 * @return {*}  {(DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined)}
 */
export declare const GetChannel: (guild: DiscordJS.Guild, finder: string | DiscordJS.Channel) => DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined;
/**
 * A function for moving a channel to a category
 *
 * @param {DiscordJS.Guild} guild
 * @param {(string | DiscordJS.Channel)} channel
 * @param {(string | DiscordJS.CategoryChannel)} category
 */
export declare const MoveChannelToCategory: (guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel) => void;
