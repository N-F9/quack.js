import { QuackJSConfig, QuackJSEvent, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global';
import * as DiscordJS from 'discord.js';
import { Model, ModelStatic, Sequelize } from 'sequelize';
export * as QuackJSUtils from './utils.js';
/**
 * The main class for creating and managing Discord bots
 *
 * @export
 * @class QuackJS
 * @implements {QuackJSObject}
 */
export declare class QuackJS implements QuackJSObject {
    config: QuackJSConfig;
    client: DiscordJS.Client;
    commands: QuackJSSlashCommand[];
    triggers: QuackJSTrigger[];
    events: QuackJSEvent[];
    sequelize: Sequelize | undefined;
    models: Record<string, ModelStatic<Model<any, any>>>;
    private token;
    constructor(token: string, config: QuackJSConfig);
    Start(QuackJS: QuackJS): Promise<void>;
    private StartEvents;
    private Login;
    AddModel(name: string, model: ModelStatic<Model<any, any>>): void;
    CreateCommand(slashCommand: QuackJSSlashCommand): void;
    CreateEvent(event: QuackJSEvent): void;
    CreateTrigger(trigger: QuackJSTrigger): void;
}
