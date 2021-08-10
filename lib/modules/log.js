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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs = __importStar(require("fs"));
const utils_1 = __importDefault(require("./utils"));
const Log = (message, type = 'i') => {
    const time = utils_1.default.Time();
    const YMD = `${time.year}-${utils_1.default.PadWithZeros(time.month, 2)}-${utils_1.default.PadWithZeros(time.date, 2)}`;
    const HMS = `${utils_1.default.PadWithZeros(time.hours, 2)}:${utils_1.default.PadWithZeros(time.minutes, 2)}:${utils_1.default.PadWithZeros(time.seconds, 2)}`;
    let title = '';
    if (type === 'i')
        title = chalk_1.blue('QuackJS');
    if (type === 'e')
        title = chalk_1.red('QuackJS');
    if (type === 's')
        title = chalk_1.green('QuackJS');
    if (type === 'w')
        title = chalk_1.yellow('QuackJS');
    console.log(chalk_1.gray(`(${YMD} ${HMS}) (CODE: ${type.toUpperCase()}) `) + title + chalk_1.gray(' » ') + chalk_1.white(message));
    fs.appendFileSync(`./logs/console/${YMD}.txt`, `${`(${YMD} ${HMS})`} (CODE: ${type.toUpperCase()}) QuackJS » ${message}\n`);
};
exports.default = Log;
