import pc from 'picocolors';
import * as fs from 'fs';
import Utils from './utils.js';
export const Log = (message, type = 'i') => {
    const time = Utils.Time();
    const YMD = `${time.year}-${Utils.PadWithZeros(time.month, 2)}-${Utils.PadWithZeros(time.date, 2)}`;
    const HMS = `${Utils.PadWithZeros(time.hours, 2)}:${Utils.PadWithZeros(time.minutes, 2)}:${Utils.PadWithZeros(time.seconds, 2)}`;
    let title = '';
    if (type === 'i')
        title = pc.blue('QuackJS');
    if (type === 'e')
        title = pc.red('QuackJS');
    if (type === 's')
        title = pc.green('QuackJS');
    if (type === 'w')
        title = pc.yellow('QuackJS');
    if (type === 'd')
        title = pc.magenta('QuackJS');
    console.log(pc.gray(`(${YMD} ${HMS}) (CODE: ${type.toUpperCase()}) `) + title + pc.gray(' » ') + pc.white(message));
    if (fs.existsSync(`./logs/console/`))
        fs.appendFileSync(`./logs/console/${YMD}.log`, `${`(${YMD} ${HMS})`} (CODE: ${type.toUpperCase()}) QuackJS » ${message}\n`);
};
export const Debug = (obj, name = 'none') => {
    if (typeof obj === 'function') {
        const timeStart = new Date();
        const returnFromObj = obj();
        const timeEnd = new Date();
        Log(name + ' ' + returnFromObj + ' ' + (timeEnd.getTime() - timeStart.getTime()) + 'ms', 'd');
        return;
    }
    Log(name + ' ' + obj.constructor.name + ' ' + (obj === null || obj === undefined), 'd');
};
