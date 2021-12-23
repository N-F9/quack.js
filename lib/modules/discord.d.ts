import { QuackJSMessage, QuackJSPromptOptions } from '../../global';
import * as DiscordJS from 'discord.js';
declare const Discord: {
    Embed(message: QuackJSMessage, placeholders?: Record<string, any> | undefined): DiscordJS.MessageOptions;
    Prompt(message: DiscordJS.Message, member: DiscordJS.GuildMember, options: QuackJSPromptOptions): Promise<unknown>;
    CreateRole(guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions): void;
    DeleteRole(guild: DiscordJS.Guild, finder: string): void;
    HasRole(member: DiscordJS.GuildMember, finder: string): Boolean;
    GiveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember>;
    RemoveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember>;
    CreateChannel(guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions): Promise<DiscordJS.TextChannel | DiscordJS.NewsChannel | DiscordJS.CategoryChannel | DiscordJS.VoiceChannel | DiscordJS.StoreChannel | DiscordJS.StageChannel>;
    DeleteChannel(guild: DiscordJS.Guild, finder: string): void;
    CreateCategory(guild: DiscordJS.Guild, name: string, options: Object): Promise<DiscordJS.CategoryChannel>;
    DeleteCategory(guild: DiscordJS.Guild, finder: string): void;
    GetChannel(guild: DiscordJS.Guild, finder: string | DiscordJS.Channel): DiscordJS.GuildChannel | DiscordJS.ThreadChannel | undefined;
    MoveChannelToCategory(guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel): void;
};
export default Discord;
