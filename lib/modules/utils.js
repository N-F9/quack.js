import * as fs from 'fs';
import path from 'path';
import ms from 'ms';
import { Log } from './log.js';
import Locale from '../handlers/locale.js';
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
        Log(Locale().utils.errors.error, 'e');
    },
    GetFiles(directory) {
        const recursivelyGetFiles = (dir, allFiles = []) => {
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
                if (fs.lstatSync(dir + '/' + file).isDirectory()) {
                    allFiles = recursivelyGetFiles(dir + '/' + file, allFiles);
                }
                else {
                    allFiles?.push(path.join('./', dir, '/', file));
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
            (async () => Log(Locale().utils.success.backup.replace(/{file}/g, file), 's'))();
        });
    },
    MS: ms,
};
export default Utils;
