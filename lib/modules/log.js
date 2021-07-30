"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs = require("fs");
var utils_1 = require("./utils");
var Log = function (message, type) {
    if (type === void 0) { type = 'i'; }
    var time = utils_1.default.Time();
    var YMD = time.year + "-" + utils_1.default.PadWithZeros(time.month, 2) + "-" + utils_1.default.PadWithZeros(time.date, 2);
    var HMS = utils_1.default.PadWithZeros(time.hours, 2) + ":" + utils_1.default.PadWithZeros(time.minutes, 2) + ":" + utils_1.default.PadWithZeros(time.seconds, 2);
    var title = '';
    if (type === 'i')
        title = chalk_1.blue('QuackJS');
    if (type === 'e')
        title = chalk_1.red('QuackJS');
    if (type === 's')
        title = chalk_1.green('QuackJS');
    if (type === 'w')
        title = chalk_1.yellow('QuackJS');
    console.log(chalk_1.gray("(" + YMD + " " + HMS + ") (CODE: " + type.toUpperCase() + ") ") +
        title +
        chalk_1.gray(' » ') +
        chalk_1.white(message));
    fs.appendFileSync("./logs/console/" + YMD + ".txt", "(" + YMD + " " + HMS + ")" + " (CODE: " + type.toUpperCase() + ") QuackJS \u00BB " + message + "\n");
};
exports.default = Log;
