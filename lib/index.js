import * as DiscordJS from 'discord.js';
import * as logs from 'discord-logs';
import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { scheduleJob } from 'node-schedule';
import * as Utils from './utils.js';
export * as QuackJSUtils from './utils.js';
/**
 * The main class for creating and managing Discord bots
 *
 * @export
 * @class QuackJS
 * @implements {QuackJSObject}
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
        this.models = {};
        this.client = new DiscordJS.Client({
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
            intents: [
                // DiscordJS.Intents.FLAGS.DIRECT_MESSAGES,
                // DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                // DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
                DiscordJS.Intents.FLAGS.GUILDS,
                // DiscordJS.Intents.FLAGS.GUILD_BANS,
                // DiscordJS.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                // DiscordJS.Intents.FLAGS.GUILD_INTEGRATIONS,
                // DiscordJS.Intents.FLAGS.GUILD_INVITES,
                DiscordJS.Intents.FLAGS.GUILD_MEMBERS,
                DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
                DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                // DiscordJS.Intents.FLAGS.GUILD_MESSAGE_TYPING,
                // DiscordJS.Intents.FLAGS.GUILD_PRESENCES,
                // DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES,
                // DiscordJS.Intents.FLAGS.GUILD_WEBHOOKS,
                ...(this.config.intents || []),
            ],
        });
    }
    async Start(QuackJS) {
        if (QuackJS.config.logsFolder)
            Utils.MkDir('logs');
        if (QuackJS.config.logsFolder)
            Utils.MkDir('logs/console');
        if (QuackJS.config.backups)
            Utils.MkDir('backups');
        logs.default(QuackJS.client);
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
                    QuackJS.commands[i].execute(interaction);
                }
                catch (error) {
                    Utils.Exception(error);
                    interaction.reply({
                        content: Utils.Locale().commands.errors.execution,
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
                    Utils.Log(Utils.Locale().commands.errors.names, 'w');
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
                                    if (cpermission !== 'everyone') {
                                        c?.permissions.add({
                                            permissions: [
                                                {
                                                    id: cpermission,
                                                    type: 'ROLE',
                                                    permission: true,
                                                },
                                            ],
                                        });
                                    }
                                }
                                catch (error) {
                                    Utils.Exception(new Error(Utils.Locale().commands.errors.creation));
                                }
                            }
                        }
                    }
                })();
            },
        });
        try {
            this.sequelize?.authenticate();
        }
        catch (error) {
            Utils.Exception(new Error(error));
        }
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
    AddModel(name, model) {
        this.models[name] = model;
        this.sequelize?.sync();
    }
    CreateCommand(slashCommand) {
        this.commands.push(slashCommand);
    }
    CreateEvent(event) {
        this.events.push(event);
    }
    CreateTrigger(trigger) {
        this.triggers.push(trigger);
    }
}
