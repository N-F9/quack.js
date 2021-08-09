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
const fs = __importStar(require("fs"));
const _ = __importStar(require("lodash"));
const logs = __importStar(require("discord-logs"));
const utils_1 = __importDefault(require("./modules/utils"));
const log_1 = __importDefault(require("./modules/log"));
const yaml_1 = __importDefault(require("./modules/yaml"));
const database_1 = __importDefault(require("./modules/database"));
const discord_1 = __importDefault(require("./modules/discord"));
const variables_1 = __importDefault(require("./modules/variables"));
const path = __importStar(require("path"));
exports.QuackJSUtils = Object.assign(Object.assign({}, utils_1.default), { YAML: yaml_1.default,
    Log: log_1.default,
    Discord: discord_1.default,
    Variables: variables_1.default,
    DB: database_1.default });
class QuackJS {
    constructor(token, config) {
        this.token = token;
        this.config = config;
        this.commands = [];
        this.slashCommands = [];
        this.events = [];
        this.triggers = [];
        this.files = [];
        this.configs = {};
        this.modules = [];
        this.client = new DiscordJS.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [
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
                ...this.config.intents
            ] });
    }
    Start(QuackJS) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.QuackJSUtils.MkDir('logs');
            exports.QuackJSUtils.MkDir('logs/console');
            exports.QuackJSUtils.MkDir('backups');
            logs.default(QuackJS.client);
            this.CreateEvent({
                name: 'messageCreate',
                execute(client, message) {
                    var _a;
                    if (message.author.bot)
                        return;
                    if (message.content.startsWith(QuackJS.config.prefix)) {
                        const unformattedArgs = message.content
                            .slice(QuackJS.config.prefix.length)
                            .split(/ +/);
                        const commandName = unformattedArgs.shift().toLowerCase();
                        const generateDobuleQuoteArgs = () => {
                            const ar = [];
                            let temp = '';
                            unformattedArgs.forEach((arg, i) => {
                                if (arg[0] === '"') {
                                    temp += arg.substring(1) + ' ';
                                }
                                else if (temp && arg[arg.length - 1] !== '"') {
                                    temp += arg + ' ';
                                }
                                else if (temp && arg[arg.length - 1] === '"') {
                                    temp += arg.slice(0, -1);
                                    ar.push(temp);
                                    temp = '';
                                }
                                else
                                    ar.push(arg);
                                if (temp && unformattedArgs.length === i + 1) {
                                    ar.push(...temp.split(' '));
                                }
                            });
                            return ar.filter((a) => a);
                        };
                        const parseArgs = (ar) => {
                            return ar.map((arg) => {
                                const url = exports.QuackJSUtils.Validator('URL', arg) && new URL(arg);
                                const num = exports.QuackJSUtils.Validator('Number', arg) && new Number(arg);
                                const date = exports.QuackJSUtils.Validator('Date', arg) && new Date(arg);
                                if (url)
                                    return url;
                                else if (!isNaN(num))
                                    return num;
                                else if (date.toString() !== 'Invalid Date')
                                    return date;
                                else
                                    return arg;
                            });
                        };
                        let args = QuackJS.config.doubleQuoteArgs
                            ? generateDobuleQuoteArgs()
                            : unformattedArgs;
                        args = QuackJS.config.parseArgs ? parseArgs(args) : args;
                        const vars = [
                            _.findIndex(QuackJS.commands, { name: commandName }),
                            _.findIndex(QuackJS.commands, (e) => e.aliases.includes(commandName)),
                        ].filter((e) => e !== -1);
                        const command = QuackJS.commands[vars[0]] || undefined;
                        if (command)
                            if (command.permission === 'everyone')
                                command.execute(client, message, args);
                            else if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.find((role) => role.id === command.permission || role.name === command.permission))
                                command.execute(client, message, args);
                        return;
                    }
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
                    if (!interaction.isCommand())
                        return;
                    const i = _.findIndex(QuackJS.slashCommands, { name: interaction.commandName });
                    if (i === -1)
                        return;
                    try {
                        QuackJS.slashCommands[i].execute(interaction);
                    }
                    catch (error) {
                        utils_1.default.Error(error);
                        interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    }
                }
            });
            this.CreateEvent({
                name: 'ready',
                execute(client) {
                    console.log('Bot ready.');
                    const commandsNames = QuackJS.commands.map((c) => c.name);
                    if (new Set(commandsNames).size !== commandsNames.length)
                        log_1.default('Two or more commands have the same name!', 'w');
                    (() => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c, _d;
                        if (!((_a = client.application) === null || _a === void 0 ? void 0 : _a.owner))
                            yield ((_b = client.application) === null || _b === void 0 ? void 0 : _b.fetch());
                        for (const command of QuackJS.slashCommands) {
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
                                                permissions: [{
                                                        id: cpermission,
                                                        type: 'ROLE',
                                                        permission: true,
                                                    }]
                                            });
                                        }
                                    }
                                    catch (error) {
                                        utils_1.default.Error(new Error('An error occurred while creating guild specific commands!'));
                                    }
                                }
                            }
                        }
                    }))();
                },
            });
            try {
                exports.QuackJSUtils.DB.authenticate();
            }
            catch (error) {
                exports.QuackJSUtils.Error(new Error(error));
            }
            yield this.YAML();
            this.files = (yield this.GetFiles());
            yield this.GetModules(QuackJS);
            yield this.StartEvents();
            yield this.Login();
        });
    }
    YAML() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                for (const conf in this.config.configs) {
                    exports.QuackJSUtils.YAML.Generate(conf, this.config.configs[conf]);
                    const con = exports.QuackJSUtils.YAML.Get(conf);
                    if (!con)
                        reject(exports.QuackJSUtils.Error(new Error(`YAML File ${conf} had an error!`)));
                    this.configs[conf] = con;
                }
                if (Object.values(this.config.configs).length ===
                    Object.values(this.configs).length)
                    resolve(this.configs);
            });
        });
    }
    GetFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const getAllFiles = (dirPath, arrayOfFiles) => {
                    const files = fs.readdirSync(path.join(process.env.PWD, dirPath, '/'));
                    arrayOfFiles = arrayOfFiles || [];
                    files.forEach((file) => {
                        if (fs
                            .statSync(path.join(process.env.PWD, dirPath, '/', file))
                            .isDirectory()) {
                            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
                        }
                        else {
                            arrayOfFiles.push(path.join(process.env.PWD, dirPath, '/', file));
                        }
                    });
                    return arrayOfFiles;
                };
                const files = getAllFiles(`/${this.config.srcDir}`, []);
                if (files)
                    resolve(files);
                else
                    reject(files);
            });
        });
    }
    GetModules(QuackJS) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, _reject) => {
                QuackJS.files
                    // .map((file) => /*'file:\\\\\\' +*/ file.replace(/\.ts/g, '.js'))
                    .forEach((file, index) => __awaiter(this, void 0, void 0, function* () {
                    if (!file.endsWith('.js') && !file.endsWith('.ts'))
                        return;
                    const name = file
                        .substring(0, file.indexOf('.js'))
                        .replace(/^.*[\\\/]/, '');
                    const module = (yield Promise.resolve().then(() => __importStar(require(file)))).default || (yield Promise.resolve().then(() => __importStar(require(file))));
                    yield module(QuackJS);
                    QuackJS.modules.push({ name, file, module });
                    if (index + 1 === QuackJS.files.length)
                        resolve(QuackJS.files);
                }));
            });
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
    CreateCommand(command) {
        this.commands.push(command);
    }
    CreateSlash(slashCommand) {
        this.slashCommands.push(slashCommand);
    }
    CreateEvent(event) {
        this.events.push(event);
    }
    CreateTrigger(trigger) {
        this.triggers.push(trigger);
    }
}
exports.QuackJS = QuackJS;
