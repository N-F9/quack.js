/// <reference types="ms" />
import { QuackJSConfig, QuackJSEvent, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global';
import * as DiscordJS from 'discord.js';
import { Sequelize } from 'sequelize';
export declare const QuackJSUtils: {
    Log: (message: string, type?: "i" | "s" | "e" | "w") => void;
    Discord: {
        Embed(message: import("../global").QuackJSMessage, placeholders?: Record<string, any> | undefined): DiscordJS.MessageOptions;
        Prompt(message: DiscordJS.Message<boolean>, member: DiscordJS.GuildMember, options: import("../global").QuackJSPromptOptions): Promise<unknown>;
        CreateRole(guild: DiscordJS.Guild, options: DiscordJS.CreateRoleOptions): void;
        DeleteRole(guild: DiscordJS.Guild, finder: string): void;
        HasRole(member: DiscordJS.GuildMember, finder: string): Boolean;
        GiveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember>;
        RemoveRole(guild: DiscordJS.Guild, member: DiscordJS.GuildMember, finder: string): Promise<DiscordJS.GuildMember>;
        CreateChannel(guild: DiscordJS.Guild, name: string, options: DiscordJS.GuildChannelCreateOptions): Promise<DiscordJS.CategoryChannel | DiscordJS.NewsChannel | DiscordJS.StageChannel | DiscordJS.StoreChannel | DiscordJS.TextChannel | DiscordJS.VoiceChannel>;
        DeleteChannel(guild: DiscordJS.Guild, finder: string): void;
        CreateCategory(guild: DiscordJS.Guild, name: string, options: Object): Promise<DiscordJS.CategoryChannel>;
        DeleteCategory(guild: DiscordJS.Guild, finder: string): void;
        GetChannel(guild: DiscordJS.Guild, finder: string | DiscordJS.Channel): DiscordJS.GuildChannel | DiscordJS.ThreadChannel | undefined;
        MoveChannelToCategory(guild: DiscordJS.Guild, channel: string | DiscordJS.Channel, category: string | DiscordJS.CategoryChannel): void;
    };
    Color: (color: string) => number;
    Time(date?: Date): import("../global").QuackJSTime;
    Error(e: Error): void;
    GetFiles(directory: string): string[];
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
    Random(min: number, max: number): number;
    RandomizeCapitalization(string: string): string;
    GenerateID(length?: number, base?: number): string;
    Emoji(e: string): string;
    Backup(file: string): void;
    MS: typeof import("ms");
};
export declare class QuackJS implements QuackJSObject {
    config: QuackJSConfig;
    client: DiscordJS.Client;
    commands: QuackJSSlashCommand[];
    triggers: QuackJSTrigger[];
    events: QuackJSEvent[];
    variables: Record<string, object>;
    sequelize: Sequelize;
    private token;
    constructor(token: string, config: QuackJSConfig);
    Start(QuackJS: QuackJS): Promise<void>;
    private StartEvents;
    private Login;
    CreateCommand(slashCommand: QuackJSSlashCommand): void;
    CreateEvent(event: QuackJSEvent): void;
    CreateTrigger(trigger: QuackJSTrigger): void;
}
