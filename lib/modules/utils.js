import * as fs from 'fs';
import path from 'path';
import ms from 'ms';
import { Log } from './log.js';
import Locale from '../handlers/locale.js';
const Utils = {
    /**
     * A function which returns an object containing useful time numbers and information.
     *
     * @param {*} [date=new Date()]
     * @return {*}  {QuackJSTime}
     */
    Time(date = new Date()) {
        const d = new Date(date);
        return {
            ms: d.getTime(),
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
    /**
     * A function for handling errors.
     *
     * @param {Error} e
     */
    Error(e) {
        fs.appendFileSync('errors.txt', `${Utils.Time().TZ}\n${e.stack}\n───────────────\n`);
        Log(Locale().utils.errors.error, 'e');
    },
    /**
     * A function for grabbing all of the files in a directory.
     *
     * @param {string} directory
     * @return {*} {string[]}
     */
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
    /**
     * A function for creating directories
     *
     * @param {string} name
     * @return {*}  {boolean}
     */
    MkDir(name) {
        if (!fs.existsSync(`./${name}`)) {
            fs.mkdirSync(`./${name}`);
            return true;
        }
        else {
            return false;
        }
    },
    /**
     * A function for padding a number with zeros; usefully for ticketing modules.
     *
     * @param {number} number
     * @param {number} length
     * @return {*}  {string}
     */
    PadWithZeros(number, length) {
        let n = '' + number;
        while (n.length < length) {
            n = '0' + n;
        }
        return n;
    },
    /**
     * A function for generating a random number between min and max inclusively.
     *
     * @param {number} min
     * @param {number} max
     * @return {*}  {number}
     */
    Random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    /**
     * A function for randomly capitalizing a string.
     *
     * @param {string} string
     * @return {*}  {string}
     */
    RandomizeCapitalization(string) {
        return string
            .split('')
            .map((chr) => (Utils.Random(0, 1) ? chr.toLowerCase() : chr.toUpperCase()))
            .join('');
    },
    /**
     * A function for generating a random id.
     *
     * @param {number} [length=8]
     * @param {number} [base=16]
     * @return {*}  {string}
     */
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
    /**
     * A function for generating a backup of a file.
     *
     * @param {string} file
     */
    Backup(file) {
        const time = Utils.Time();
        fs.copyFile(file, `./backups/${time.year}-${time.month}-${time.date}-${file}`, (err) => {
            if (err)
                return this.Error(err);
            Log(Locale().utils.success.backup.replace(/{file}/g, file), 's');
        });
    },
    MS: ms,
};
export default Utils;
