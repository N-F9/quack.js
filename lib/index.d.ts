import { QuackJSCommand, QuackJSConfig, QuackJSEvent, QuackJSModule, QuackJSObject } from '../global';
import * as DiscordJS from 'discord.js';
export declare const QuackJSUtils: {
    YAML: {
        Get(file: string): object | null | undefined;
        Generate(file: string, contents: string | object): void;
    };
    Log: (message: any, type?: "i" | "s" | "e" | "w") => void;
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
