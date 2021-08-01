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
var fs = __importStar(require("fs"));
var log_1 = __importDefault(require("./log"));
var Utils = {
    Time: function (date) {
        if (date === void 0) { date = new Date(); }
        var d = new Date(date);
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
    Error: function (e) {
        fs.appendFileSync('errors.txt', Utils.Time().TZ + "\n" + e.stack + "\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
        log_1.default('An error has occured!', 'e');
    },
    MkDir: function (name) {
        if (!fs.existsSync("./" + name)) {
            fs.mkdirSync("./" + name);
            return true;
        }
        else {
            return false;
        }
    },
    PadWithZeros: function (number, length) {
        var n = '' + number;
        while (n.length < length) {
            n = '0' + n;
        }
        return n;
    },
    Random: function (min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    RandomizeCapitalization: function (string) {
        return string.split('').map(function (chr) { return (Utils.Random(0, 1)) ? chr.toLowerCase() : chr.toUpperCase(); }).join('');
    },
    GenerateID: function () {
        return Utils.RandomizeCapitalization(Math.random().toString(36).slice(-8));
    },
    emoji: function (e) {
        return e.replace(/<:.+:|>/g, '');
    },
    backup: function (file) {
        var time = Utils.Time();
        fs.copyFile(file, "./backups/" + time.year + "-" + time.month + "-" + time.date + "-" + file, function (err) {
            if (err)
                throw err;
            log_1.default("Created backup of " + file, 's');
        });
    },
};
exports.default = Utils;
