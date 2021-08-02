"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuackJS = exports.QuackJSUtils = void 0;
var DiscordJS = __importStar(require("discord.js"));
var fs = __importStar(require("fs"));
var _ = __importStar(require("lodash"));
var logs = __importStar(require("discord-logs"));
var utils_1 = __importDefault(require("./modules/utils"));
var log_1 = __importDefault(require("./modules/log"));
var yaml_1 = __importDefault(require("./modules/yaml"));
var database_1 = __importDefault(require("./modules/database"));
var discord_1 = __importDefault(require("./modules/discord"));
var variables_1 = __importDefault(require("./modules/variables"));
var path = __importStar(require("path"));
exports.QuackJSUtils = __assign(__assign({}, utils_1.default), { YAML: yaml_1.default, Log: log_1.default, Discord: discord_1.default, Variables: variables_1.default, DB: database_1.default });
var QuackJS = /** @class */ (function () {
    function QuackJS(token, config) {
        this.token = token;
        this.config = config;
        this.commands = [];
        this.events = [];
        this.triggers = [];
        this.files = [];
        this.configs = {};
        this.modules = [];
        this.client = new DiscordJS.Client();
    }
    QuackJS.prototype.Start = function (QuackJS) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        exports.QuackJSUtils.MkDir('logs');
                        exports.QuackJSUtils.MkDir('logs/console');
                        exports.QuackJSUtils.MkDir('backups');
                        logs.default(QuackJS.client);
                        this.CreateEvent({
                            name: 'message',
                            execute: function (client, message) {
                                var _a;
                                if (message.author.bot)
                                    return;
                                if (message.content.startsWith(QuackJS.config.prefix)) {
                                    var unformattedArgs_1 = message.content
                                        .slice(QuackJS.config.prefix.length)
                                        .split(/ +/);
                                    var commandName_1 = unformattedArgs_1.shift().toLowerCase();
                                    var generateDobuleQuoteArgs = function () {
                                        var ar = [];
                                        var temp = '';
                                        unformattedArgs_1.forEach(function (arg, i) {
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
                                            if (temp && unformattedArgs_1.length === i + 1) {
                                                ar.push.apply(ar, temp.split(' '));
                                            }
                                        });
                                        return ar.filter(function (a) { return a; });
                                    };
                                    var parseArgs = function (ar) {
                                        return ar.map(function (arg) {
                                            var url = exports.QuackJSUtils.Validator('URL', arg) && new URL(arg);
                                            var number = exports.QuackJSUtils.Validator('Number', arg) && new Number(arg);
                                            var date = exports.QuackJSUtils.Validator('Date', arg) && new Date(arg);
                                            console.log(arg, url, number, date);
                                            if (url)
                                                return url;
                                            else if (!isNaN(number))
                                                return number;
                                            else if (date.toString() !== 'Invalid Date')
                                                return date;
                                            else
                                                return arg;
                                        });
                                    };
                                    var args = (QuackJS.config.doubleQuoteArgs) ? generateDobuleQuoteArgs() : unformattedArgs_1;
                                    args = (QuackJS.config.parseArgs) ? parseArgs(args) : args;
                                    var vars = [
                                        _.findIndex(QuackJS.commands, { name: commandName_1 }),
                                        _.findIndex(QuackJS.commands, function (e) {
                                            return e.aliases.includes(commandName_1);
                                        }),
                                    ].filter(function (e) { return e !== -1; });
                                    var command_1 = QuackJS.commands[vars[0]] || undefined;
                                    if (command_1)
                                        if (command_1.permission === 'everyone')
                                            command_1.execute(client, message, args);
                                        else if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.array().some(function (role) {
                                            return role.id === command_1.permission ||
                                                role.name === command_1.permission;
                                        }))
                                            command_1.execute(client, message, args);
                                    return;
                                }
                                QuackJS.triggers.forEach(function (trigger) {
                                    if (message.content.match(trigger.trigger)) {
                                        trigger.execute(client, message);
                                    }
                                });
                            },
                        });
                        this.CreateEvent({
                            name: 'ready',
                            execute: function (client) {
                                console.log('Bot ready.');
                                var commandsNames = QuackJS.commands.map(function (c) { return c.name; });
                                if (new Set(commandsNames).size !== commandsNames.length)
                                    log_1.default('Two or more commands have the same name!', 'w');
                            },
                        });
                        try {
                            exports.QuackJSUtils.DB.authenticate();
                        }
                        catch (error) {
                            exports.QuackJSUtils.Error(new Error(error));
                        }
                        return [4 /*yield*/, this.YAML()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.GetFiles()];
                    case 2:
                        _a.files = (_b.sent());
                        return [4 /*yield*/, this.GetModules(QuackJS)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.StartEvents()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.Login()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QuackJS.prototype.YAML = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        for (var conf in _this.config.configs) {
                            exports.QuackJSUtils.YAML.Generate(conf, _this.config.configs[conf]);
                            var con = exports.QuackJSUtils.YAML.Get(conf);
                            if (!con)
                                reject(exports.QuackJSUtils.Error(new Error("YAML File " + conf + " had an error!")));
                            _this.configs[conf] = con;
                        }
                        if (Object.values(_this.config.configs).length ===
                            Object.values(_this.configs).length)
                            resolve(_this.configs);
                    })];
            });
        });
    };
    QuackJS.prototype.GetFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var getAllFiles = function (dirPath, arrayOfFiles) {
                            var files = fs.readdirSync(path.join(__dirname, dirPath, '/'));
                            arrayOfFiles = arrayOfFiles || [];
                            files.forEach(function (file) {
                                if (fs.statSync(path.join(__dirname, dirPath, '/', file)).isDirectory()) {
                                    arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
                                }
                                else {
                                    arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
                                }
                            });
                            return arrayOfFiles;
                        };
                        var files = getAllFiles("../" + _this.config.srcDir, []);
                        if (files)
                            resolve(files);
                        else
                            reject(files);
                    })];
            });
        });
    };
    QuackJS.prototype.GetModules = function (QuackJS) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, _reject) {
                        var c = 0;
                        QuackJS.files
                            // .map((file) => /*'file:\\\\\\' +*/ file.replace(/\.ts/g, '.js'))
                            .forEach(function (file, _index) { return __awaiter(_this, void 0, void 0, function () {
                            var name, module, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!file.endsWith('.js'))
                                            return [2 /*return*/];
                                        name = file
                                            .substring(0, file.indexOf('.js'))
                                            .replace(/^.*[\\\/]/, '');
                                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(file)); })];
                                    case 1:
                                        _a = (_b.sent()).default;
                                        if (_a) return [3 /*break*/, 3];
                                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(file)); })];
                                    case 2:
                                        _a = (_b.sent());
                                        _b.label = 3;
                                    case 3:
                                        module = _a;
                                        return [4 /*yield*/, module(QuackJS)];
                                    case 4:
                                        _b.sent();
                                        QuackJS.modules.push({ name: name, file: file, module: module });
                                        c++;
                                        if (c === QuackJS.files.length)
                                            resolve(QuackJS.files);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    QuackJS.prototype.StartEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, event_1;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.events; _i < _a.length; _i++) {
                    event_1 = _a[_i];
                    this.client.on(event_1.name, event_1.execute.bind(null, this.client));
                }
                return [2 /*return*/];
            });
        });
    };
    QuackJS.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, _reject) {
                        resolve(_this.client.login(_this.token));
                    })];
            });
        });
    };
    QuackJS.prototype.CreateCommand = function (command) {
        this.commands.push(command);
    };
    QuackJS.prototype.CreateEvent = function (event) {
        this.events.push(event);
    };
    QuackJS.prototype.CreateTrigger = function (trigger) {
        this.triggers.push(trigger);
    };
    return QuackJS;
}());
exports.QuackJS = QuackJS;
