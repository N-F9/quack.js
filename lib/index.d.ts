import { QuackJSConfig, QuackJSEvent, QuackJSObject, QuackJSSlashCommand, QuackJSTrigger } from '../global';
import * as DiscordJS from 'discord.js';
import { Model, ModelStatic, Sequelize } from 'sequelize';
export * as QuackJSUtils from './utils.js';
/**
 * The main class for creating and managing Discord bots
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
    /**
     * Creates an instance of QuackJS.
     *
     * @param token - The Discord bot's token.
     * @param config - The config of the Discord bot.
     */
    constructor(token: string, config: QuackJSConfig);
    /**
     * Starts the Discord bot.
     *
     * @param QuackJS - The parameter of this class.
     */
    Start(QuackJS: QuackJS): Promise<void>;
    private StartEvents;
    private Login;
    /**
     * A method for adding models for the Database.
     *
     * @param name - The name of the model.
     * @param model - The model to be used for the Database.
     */
    AddModel(name: string, model: ModelStatic<Model<any, any>>): void;
    /**
     * Adds a slash command to the object.
     *
     * @param slashCommand - The slash command to be added.
     */
    CreateCommand(slashCommand: QuackJSSlashCommand): void;
    /**
     * Adds an event to the object.
     *
     * @param event - The event to be added.
     */
    CreateEvent(event: QuackJSEvent): void;
    /**
     * Adds a trigger to the object.
     *
     * @param trigger - The trigger to be added.
     */
    CreateTrigger(trigger: QuackJSTrigger): void;
}
