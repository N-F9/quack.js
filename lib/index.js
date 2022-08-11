import * as DiscordJS from 'discord.js';
// import * as logs from 'discord-logs'
import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { scheduleJob } from 'node-schedule';
import * as Utils from './utils.js';
export * as QuackJSUtils from './utils.js';
/**
 * The main class for creating and managing Discord bots
 */
export class QuackJS {
    config;
    client;
    commands;
    triggers;
    events;
    sequelize;
    models;
    token;
    /**
     * Creates an instance of QuackJS.
     *
     * @param token - The Discord bot's token.
     * @param config - The config of the Discord bot.
     */
    constructor(token, config) {
        this.token = token;
        this.config = config;
        this.commands = [];
        this.triggers = [];
        this.events = [];
        const defaultDatabase = {
            dialect: 'sqlite',
            storage: 'database.sqlite',
            logging: false,
        };
        if (typeof config.database === 'boolean') {
            if (config.database)
                this.sequelize = new Sequelize(defaultDatabase);
            else
                this.sequelize = undefined;
        }
        else
            this.sequelize = new Sequelize(config.database || defaultDatabase);
        try {
            this.sequelize?.authenticate();
        }
        catch (error) {
            Utils.Exception(new Error(error));
        }
        this.models = {};
        this.client = new DiscordJS.Client({
            partials: [DiscordJS.Partials.Message, DiscordJS.Partials.Channel, DiscordJS.Partials.Reaction],
            intents: [
                // DiscordJS.GatewayIntentBits.DirectMessages,
                // DiscordJS.GatewayIntentBits.DirectMessageReactions,
                // DiscordJS.GatewayIntentBits.DirectMessageTyping,
                DiscordJS.GatewayIntentBits.Guilds,
                // DiscordJS.GatewayIntentBits.GuildBans,
                // DiscordJS.GatewayIntentBits.GuildEmojisAndStickers,
                // DiscordJS.GatewayIntentBits.GuildIntegrations,
                // DiscordJS.GatewayIntentBits.GuildInvites,
                DiscordJS.GatewayIntentBits.GuildMembers,
                DiscordJS.GatewayIntentBits.GuildMessages,
                DiscordJS.GatewayIntentBits.GuildMessageReactions,
                // DiscordJS.GatewayIntentBits.GuildMessageTyping,
                // DiscordJS.GatewayIntentBits.GuildPresences,
                // DiscordJS.GatewayIntentBits.GuildVoiceStates,
                // DiscordJS.GatewayIntentBits.GuildWebhooks,
                ...(this.config.intents || []),
            ],
        });
    }
    /**
     * Starts the Discord bot.
     *
     * @param QuackJS - The parameter of this class.
     */
    async Start(QuackJS) {
        if (QuackJS.config.logsFolder) {
            Utils.MkDir('logs');
            Utils.MkDir('logs/console');
        }
        if (QuackJS.config.backups)
            Utils.MkDir('backups');
        // logs.default(QuackJS.client) // not compatible with DJS 14
        this.CreateEvent({
            name: 'messageCreate',
            execute(client, message) {
                if (message.author.bot)
                    return;
                QuackJS.triggers.forEach((trigger) => {
                    if (message.content.match(trigger.trigger)) {
                        trigger.execute(client, message);
                    }
                });
            },
        });
        this.CreateEvent({
            name: 'interactionCreate',
            async execute(client, interaction) {
                if (!interaction.isCommand())
                    return;
                const i = _.findIndex(QuackJS.commands, {
                    name: interaction.commandName,
                });
                if (i === -1)
                    return;
                try {
                    if (Utils.Discord.HasRole(interaction.member, QuackJS.commands[i].permission) || QuackJS.commands[i].permission === 'everyone')
                        QuackJS.commands[i].execute(interaction);
                    else
                        interaction.reply({
                            content: 'Invalid permissions!',
                            ephemeral: true,
                        });
                }
                catch (error) {
                    Utils.Exception(error);
                    interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            },
        });
        this.CreateEvent({
            name: 'ready',
            async execute(client) {
                if (QuackJS.config.backups) {
                    QuackJS.config.backups.forEach((backup) => {
                        Utils.Backup(backup.file);
                        scheduleJob(backup.scheduling, () => {
                            Utils.Backup(backup.file);
                        });
                    });
                }
                const commandsNames = QuackJS.commands.map((c) => c.name);
                if (new Set(commandsNames).size !== commandsNames.length)
                    Utils.Log('Two or more commands have the same name!', 'w');
                (async () => {
                    if (!client.application?.owner)
                        await client.application?.fetch();
                    for (const command of QuackJS.commands) {
                        const cpermission = command.permission;
                        if (command.guilds.length === 0) {
                            await client.application?.commands.create(command);
                        }
                        else {
                            for (const guild of command.guilds) {
                                try {
                                    const c = await client.guilds.cache.get(guild)?.commands.create(command);
                                    // if (cpermission !== 'everyone') {
                                    // 	c?.permissions.add({
                                    // 		permissions: [
                                    // 			{
                                    // 				id: cpermission,
                                    // 				type: 'ROLE',
                                    // 				permission: true,
                                    // 			},
                                    // 		],
                                    // 	})
                                    // }
                                }
                                catch (error) {
                                    Utils.Exception(new Error('An error occurred while creating guild specific commands!'));
                                }
                            }
                        }
                    }
                })();
            },
        });
        await this.StartEvents();
        await this.Login();
    }
    async StartEvents() {
        for (const event of this.events) {
            this.client.on(event.name, event.execute.bind(null, this.client));
        }
    }
    async Login() {
        return new Promise((resolve, _reject) => {
            resolve(this.client.login(this.token));
        });
    }
    /**
     * A method for adding models for the Database.
     *
     * @param name - The name of the model.
     * @param model - The model to be used for the Database.
     */
    AddModel(name, model) {
        this.models[name] = model;
        this.sequelize?.sync();
    }
    /**
     * Adds a slash command to the object.
     *
     * @param slashCommand - The slash command to be added.
     */
    CreateCommand(slashCommand) {
        this.commands.push(slashCommand);
    }
    /**
     * Adds an event to the object.
     *
     * @param event - The event to be added.
     */
    CreateEvent(event) {
        this.events.push(event);
    }
    /**
     * Adds a trigger to the object.
     *
     * @param trigger - The trigger to be added.
     */
    CreateTrigger(trigger) {
        this.triggers.push(trigger);
    }
}
