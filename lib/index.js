"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuackJS = exports.QuackJSUtils = void 0;
const DiscordJS = __importStar(require("discord.js"));
const logs = __importStar(require("discord-logs"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const sequelize_1 = require("sequelize");
const node_schedule_1 = require("node-schedule");
const utils_1 = __importDefault(require("./modules/utils"));
const log_1 = __importDefault(require("./modules/log"));
const discord_1 = __importDefault(require("./modules/discord"));
const color_1 = __importDefault(require("./modules/color"));
const html_1 = __importDefault(require("./modules/html"));
const locale_1 = __importDefault(require("./handlers/locale"));
exports.QuackJSUtils = Object.assign(Object.assign({}, utils_1.default), { Log: log_1.default,
    Discord: discord_1.default,
    Color: color_1.default,
    HTML: html_1.default,
    Locale: locale_1.default });
class QuackJS {
    constructor(token, config) {
        this.token = token;
        this.config = config;
        this.commands = [];
        this.triggers = [];
        this.events = [];
        this.variables = {};
        this.sequelize = new sequelize_1.Sequelize(config.database || {
            dialect: 'sqlite',
            storage: 'database.sqlite',
            logging: false,
        });
        this.models = {};
        fs.writeFileSync(path_1.default.join(__dirname, `../locales/settings.json`), JSON.stringify({
            location: config.locale || 'en_US',
        }));
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
    Start(QuackJS) {
        return __awaiter(this, void 0, void 0, function* () {
            if (QuackJS.config.logsFolder)
                exports.QuackJSUtils.MkDir('logs');
            if (QuackJS.config.logsFolder)
                exports.QuackJSUtils.MkDir('logs/console');
            if (QuackJS.config.backups)
                exports.QuackJSUtils.MkDir('backups');
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
                execute(client, interaction) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!interaction.isCommand())
                            return;
                        const i = lodash_1.default.findIndex(QuackJS.commands, {
                            name: interaction.commandName,
                        });
                        if (i === -1)
                            return;
                        try {
                            QuackJS.commands[i].execute(interaction);
                        }
                        catch (error) {
                            utils_1.default.Error(error);
                            interaction.reply({
                                content: (yield (0, locale_1.default)()).commands.errors.execution,
                                ephemeral: true,
                            });
                        }
                    });
                },
            });
            this.CreateEvent({
                name: 'ready',
                execute(client) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (QuackJS.config.backups) {
                            QuackJS.config.backups.forEach((backup) => {
                                exports.QuackJSUtils.Backup(backup.file);
                                (0, node_schedule_1.scheduleJob)(backup.scheduling, () => {
                                    exports.QuackJSUtils.Backup(backup.file);
                                });
                            });
                        }
                        const commandsNames = QuackJS.commands.map((c) => c.name);
                        if (new Set(commandsNames).size !== commandsNames.length)
                            (0, log_1.default)((yield (0, locale_1.default)()).commands.errors.names, 'w');
                        (() => __awaiter(this, void 0, void 0, function* () {
                            var _a, _b, _c, _d;
                            if (!((_a = client.application) === null || _a === void 0 ? void 0 : _a.owner))
                                yield ((_b = client.application) === null || _b === void 0 ? void 0 : _b.fetch());
                            for (const command of QuackJS.commands) {
                                const cpermission = command.permission;
                                if (command.guilds.length === 0) {
                                    yield ((_c = client.application) === null || _c === void 0 ? void 0 : _c.commands.create(command));
                                }
                                else {
                                    for (const guild of command.guilds) {
                                        try {
                                            const c = yield ((_d = client.guilds.cache.get(guild)) === null || _d === void 0 ? void 0 : _d.commands.create(command));
                                            if (cpermission !== 'everyone') {
                                                c === null || c === void 0 ? void 0 : c.permissions.add({
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
                                            utils_1.default.Error(new Error((yield (0, locale_1.default)()).commands.errors.creation));
                                        }
                                    }
                                }
                            }
                        }))();
                    });
                },
            });
            try {
                this.sequelize.authenticate();
            }
            catch (error) {
                exports.QuackJSUtils.Error(new Error(error));
            }
            yield this.StartEvents();
            yield this.Login();
        });
    }
    StartEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const event of this.events) {
                this.client.on(event.name, event.execute.bind(null, this.client));
            }
        });
    }
    Login() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, _reject) => {
                resolve(this.client.login(this.token));
            });
        });
    }
    AddModel(name, model) {
        this.models[name] = model;
        this.sequelize.sync();
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
exports.QuackJS = QuackJS;
