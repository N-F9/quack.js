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
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const ms_1 = __importDefault(require("ms"));
const log_1 = __importDefault(require("./log"));
const locale_1 = __importDefault(require("../handlers/locale"));
const Utils = {
    Time(date = new Date()) {
        const d = new Date(date);
        return {
            UTC: d.toUTCString(),
            ISO: d.toISOString(),
            TZ: d.toString(),
            date: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            hours: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds(),
        };
    },
    Error(e) {
        fs.appendFileSync('errors.txt', `${Utils.Time().TZ}\n${e.stack}\n───────────────\n`);
        (() => __awaiter(this, void 0, void 0, function* () { return (0, log_1.default)((yield (0, locale_1.default)()).utils.errors.error, 'e'); }))();
    },
    GetFiles(directory) {
        const recursivelyGetFiles = (dir, allFiles = []) => {
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
                if (fs.lstatSync(dir + '/' + file).isDirectory()) {
                    allFiles = recursivelyGetFiles(dir + '/' + file, allFiles);
                }
                else {
                    allFiles === null || allFiles === void 0 ? void 0 : allFiles.push(path_1.default.join('./', dir, '/', file));
                }
            });
            return allFiles;
        };
        return recursivelyGetFiles(directory);
    },
    MkDir(name) {
        if (!fs.existsSync(`./${name}`)) {
            fs.mkdirSync(`./${name}`);
            return true;
        }
        else {
            return false;
        }
    },
    PadWithZeros(number, length) {
        let n = '' + number;
        while (n.length < length) {
            n = '0' + n;
        }
        return n;
    },
    Random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    RandomizeCapitalization(string) {
        return string
            .split('')
            .map((chr) => (Utils.Random(0, 1) ? chr.toLowerCase() : chr.toUpperCase()))
            .join('');
    },
    GenerateID(length = 8, base = 16) {
        const id = 'x'
            .repeat(length)
            .split('')
            .map(() => Math.floor(Math.random() * base)
            .toString(base)
            .slice(-1))
            .join('');
        return Utils.RandomizeCapitalization(id);
    },
    Emoji(e) {
        return e.replace(/<:.+:|>/g, '');
    },
    Backup(file) {
        const time = Utils.Time();
        fs.copyFile(file, `./backups/${time.year}-${time.month}-${time.date}-${file}`, (err) => {
            if (err)
                return this.Error(err);
            (() => __awaiter(this, void 0, void 0, function* () { return (0, log_1.default)((yield (0, locale_1.default)()).utils.success.backup.replace(/{file}/g, file), 's'); }))();
        });
    },
    MS: ms_1.default,
};
exports.default = Utils;
