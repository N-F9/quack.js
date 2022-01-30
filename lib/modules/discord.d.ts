import { QuackJSMessage, QuackJSPromptOptions } from '../../global';
import * as DiscordJS from 'discord.js';
declare const Discord: {
    /**
     * A function for generating an embed with ease.
     *
     * @param {QuackJSMessage} message
     * @param {Record<string, any>} [placeholders]
     * @return {*}  {DiscordJS.MessageOptions}
     */
    Embed(message: QuackJSMessage, placeholders?: Record<string, any> | undefined): DiscordJS.MessageOptions;
    /**
     * A function for prompting the user for input; either from a message input or a reaction input.
     *
     * @param {DiscordJS.Message} message
     * @param {DiscordJS.GuildMember} member
     * @param {QuackJSPromptOptions} options
     * @return {*}  {(Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined>)}
     */
    Prompt(message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions): Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined>;
    /**
     * A function for creating roles.
     *
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.CreateRoleOptions} options
     */
    CreateRole(guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions): void;
    /**
     * A function for deleting roles.
     *
     * @param {DiscordJS.Guild} guild
     * @param {string} finder
     */
    DeleteRole(guild: DiscordJS.Guild, finder: string): void;
    /**
     * A function for checking if a user has a role.
     *
     * @param {DiscordJS.GuildMember} member
     * @param {string} finder
     * @return {*}  {boolean}
     */
    HasRole(member: DiscordJS.GuildMember, finder: string): boolean;
    /**
     * A function for giving a user a role.
     *
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.GuildMember} member
     * @param {string} finder
     * @return {*}  {Promise<DiscordJS.GuildMember>}
     */
    GiveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember>;
    /**
     * A function for removing a role from a user.
     *
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.GuildMember} member
     * @param {string} finder
     * @return {*}  {Promise<DiscordJS.GuildMember>}
     */
    RemoveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember>;
    /**
     * A function for creating a channel.
     *
     * @param {DiscordJS.Guild} guild
     * @param {string} name
     * @param {DiscordJS.GuildChannelCreateOptions} options
     * @return {*}  {Promise<DiscordJS.TextChannel>}
     */
    CreateChannel(guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions): Promise<DiscordJS.TextChannel>;
    /**
     * A function for deleting a channel
     *
     * @param {DiscordJS.Guild} guild
     * @param {string} finder
     */
    DeleteChannel(guild: DiscordJS.Guild, finder: string): void;
    /**
     * A function for creating category channels.
     *
     * @param {DiscordJS.Guild} guild
     * @param {string} name
     * @param {Object} options
     * @return {*}  {Promise<DiscordJS.CategoryChannel>}
     */
    CreateCategory(guild: DiscordJS.Guild, name: string, options: Object): Promise<DiscordJS.CategoryChannel>;
    /**
     * A function for deleting a category channel.
     *
     * @param {DiscordJS.Guild} guild
     * @param {string} finder
     */
    DeleteCategory(guild: DiscordJS.Guild, finder: string): void;
    /**
     * A function for getting a channel
     *
     * @param {DiscordJS.Guild} guild
     * @param {(string | DiscordJS.Channel)} finder
     * @return {*}  {(DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined)}
     */
    GetChannel(guild: DiscordJS.Guild, finder: string | DiscordJS.Channel): DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined;
    /**
     * A function for moving a channel to a category
     *
     * @param {DiscordJS.Guild} guild
     * @param {(string | DiscordJS.Channel)} channel
     * @param {(string | DiscordJS.CategoryChannel)} category
     */
    MoveChannelToCategory(guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel): void;
};
export default Discord;
