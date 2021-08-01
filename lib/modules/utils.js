"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var log_1 = require("./log");
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
    }
};
exports.default = Utils;
