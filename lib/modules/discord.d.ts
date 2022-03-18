import { QuackJSMessage, QuackJSPromptOptions } from '../../global';
import * as DiscordJS from 'discord.js';
/**
 * A function for generating an embed with ease.
 *
 * @param message - The message object to be generated from.
 * @param placeholders - The placerholders to be replaced within the `message`.
 * @returns The formatted Discord Message Options.
 */
export declare const Embed: (message: QuackJSMessage, placeholders?: Record<string, any> | undefined) => DiscordJS.MessageOptions;
/**
 * A function for prompting the user for input; either from a message input or a reaction input.
 *
 * @param message - The message object to be used.
 * @param member - The member to be prompted.
 * @param options - The option of the prompt.
 * @returns A promise which resolves the input the user gave.
 */
export declare const Prompt: (message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions) => Promise<DiscordJS.MessageReaction | DiscordJS.Message<boolean> | undefined>;
/**
 * A function for creating roles.
 *
 * @param guild - The guild which will be modified.
 * @param options - The option for the new role.
 */
export declare const CreateRole: (guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions) => void;
/**
 * A function for deleting roles.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export declare const DeleteRole: (guild: DiscordJS.Guild, finder: string) => void;
/**
 * A function for checking if a user has a role.
 *
 * @param member - The memeber which will be check.
 * @param finder - The parameter which the function will search for.
 * @returns `true` if the user has the role and `false` if the user doesn't have the role.
 */
export declare const HasRole: (member: DiscordJS.GuildMember, finder: string) => boolean;
/**
 * A function for giving a user a role.
 *
 * @param guild - The guild which will be modified.
 * @param member - The member which will be given the role.
 * @param finder - The parameter for finding roles.
 * @returns A boolean whether or not the user was given the role.
 */
export declare const GiveRole: (guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string) => Promise<DiscordJS.GuildMember>;
/**
 * A function for removing a role from a user.
 *
 * @param guild - The guild which will be modified.
 * @param member - The member which will be removed from the role.
 * @param finder - The parameter for finding roles.
 * @returns A boolean whether or not the user was given the role.
 */
export declare const RemoveRole: (guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string) => Promise<DiscordJS.GuildMember>;
/**
 * A function for creating a channel.
 *
 * @param guild - The guild which will be modified.
 * @param name - The name of the text channel.
 * @param options - The options for the text channel.
 * @returns The text channel.
 */
export declare const CreateChannel: (guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions) => Promise<DiscordJS.TextChannel>;
/**
 * A function for deleting a channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export declare const DeleteChannel: (guild: DiscordJS.Guild, finder: string) => void;
/**
 * A function for creating category channels.
 *
 * @param guild - The guild which will be modified.
 * @param name - The name of the category.
 * @param options - The options for the category.
 * @returns The category channel.
 */
export declare const CreateCategory: (guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions) => Promise<DiscordJS.CategoryChannel>;
/**
 * A function for deleting a category channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 */
export declare const DeleteCategory: (guild: DiscordJS.Guild, finder: string) => void;
/**
 * A function for getting a channel.
 *
 * @param guild - The guild which will be modified.
 * @param finder - The parameter which the function will search for.
 * @returns The channel.
 */
export declare const GetChannel: (guild: DiscordJS.Guild, finder: string | DiscordJS.Channel) => DiscordJS.ThreadChannel | DiscordJS.GuildChannel | undefined;
/**
 * A function for moving a channel to a category.
 *
 * @param guild - The guild which will be modified.
 * @param channel - The channel to be moved to the `category`.
 * @param category - The category which the `channel` will be moved to.
 */
export declare const MoveChannelToCategory: (guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel) => void;
/**
 * An object for the limits of Discord.
 */
export declare const LIMITS: {
    EMBED: {
        TITLE: number;
        DESCRIPTION: number;
        FIELDS: number;
        FIELD: {
            NAME: number;
            VALUE: number;
        };
        FOOTER: {
            TEXT: number;
        };
        AUTHOR: {
            NAME: number;
        };
    };
    MESSAGE: {
        EMBED: number;
        EMBEDS: number;
        CONTENT: number;
    };
};
