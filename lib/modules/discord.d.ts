import * as DiscordJS from 'discord.js';
import { QuackJSMessage, QuackJSPromptOptions } from '../../global';
declare const Discord: {
    Embed(message: QuackJSMessage, placeholders?: Record<string, any> | undefined): DiscordJS.MessageOptions;
    Prompt(message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions): Promise<unknown>;
    CreateRole(guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions): void;
    DeleteRole(guild: DiscordJS.Guild, finder: string | number): void;
    HasRole(member: DiscordJS.GuildMember, finder: string | number): Boolean;
    GiveRole(member: DiscordJS.GuildMember, guild: DiscordJS.Guild, finder: string | number): Promise<DiscordJS.GuildMember>;
    RemoveRole(member: DiscordJS.GuildMember, guild: DiscordJS.Guild, finder: string | number): Promise<DiscordJS.GuildMember>;
    CreateChannel(guild: DiscordJS.Guild, name: string, options: Object): Promise<DiscordJS.TextChannel>;
    DeleteChannel(guild: DiscordJS.Guild, finder: string | number): void;
    CreateCategory(guild: DiscordJS.Guild, name: string, options: Object): Promise<DiscordJS.CategoryChannel>;
    DeleteCategory(guild: DiscordJS.Guild, finder: string | number): void;
    MoveChannelToCategory(guild: DiscordJS.Guild, channel: string | number, category: string | number): void;
};
export default Discord;
