import { QuackJSCommand, QuackJSConfig, QuackJSEvent, QuackJSModule, QuackJSObject } from '../global';
import * as DiscordJS from 'discord.js';
export declare const QuackJSUtils: {
    YAML: {
        Get(file: string): object | null | undefined;
        Generate(file: string, contents: string | object): void;
    };
    Log: (message: any, type?: "i" | "s" | "e" | "w") => void;
    Discord: {
        Embed(): void;
        CreateRole(guild: DiscordJS.Guild, options: Object): void;
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
    Variables: Record<string, any>;
    Time(date?: Date): import("../global").QuackJSTime;
    Error(e: Error): void;
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
};
export declare class QuackJS implements QuackJSObject {
    config: QuackJSConfig;
    client: DiscordJS.Client;
    commands: QuackJSCommand[];
    events: QuackJSEvent[];
    files: string[];
    configs: Record<string, object>;
    modules: QuackJSModule[];
    private token;
    constructor(token: string, config: QuackJSConfig);
    Start(QuackJS: QuackJS): Promise<void>;
    private YAML;
    private GetFiles;
    private GetModules;
    private StartEvents;
    private Login;
    CreateCommand(command: QuackJSCommand): void;
    CreateEvent(event: QuackJSEvent): void;
}
