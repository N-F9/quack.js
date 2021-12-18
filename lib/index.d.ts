import { QuackJSCommand, QuackJSConfig, QuackJSEvent, QuackJSModule, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global';
import * as DiscordJS from 'discord.js';
export declare const QuackJSUtils: {
    YAML: {
        Get(file: string): object | null | undefined;
        Generate(file: string, contents: string | object): void;
    };
    Log: (message: string, type?: "i" | "s" | "e" | "w") => void;
    Discord: {
        Embed(message: import("../global").QuackJSMessage, placeholders?: Record<string, any> | undefined): DiscordJS.MessageOptions;
        Prompt(message: DiscordJS.Message<boolean>, member: DiscordJS.GuildMember, options: import("../global").QuackJSPromptOptions): Promise<unknown>;
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
    DB: import("sequelize/dist").Sequelize;
    Time(date?: Date): import("../global").QuackJSTime;
    Error(e: Error): void;
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
    Random(min: number, max: number): number;
    RandomizeCapitalization(string: string): string;
    GenerateID(): string;
    Emoji(e: string): string;
    Backup(file: string): void;
    Validator(type: "URL" | "Number" | "Date", value: any): boolean | undefined;
};
export declare class QuackJS implements QuackJSObject {
    config: QuackJSConfig;
    client: DiscordJS.Client;
    commands: QuackJSCommand[];
    slashCommands: QuackJSSlashCommand[];
    triggers: QuackJSTrigger[];
    events: QuackJSEvent[];
    files: string[];
    configs: Record<string, object>;
    modules: QuackJSModule[];
    variables: Record<string, object>;
    private token;
    constructor(token: string, config: QuackJSConfig);
    Start(QuackJS: QuackJS): Promise<void>;
    private YAML;
    private GetFiles;
    private GetModules;
    private StartEvents;
    private Login;
    CreateCommand(command: QuackJSCommand): void;
    CreateSlash(slashCommand: QuackJSSlashCommand): void;
    CreateEvent(event: QuackJSEvent): void;
    CreateTrigger(trigger: QuackJSTrigger): void;
}
