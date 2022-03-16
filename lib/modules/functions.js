import * as fs from 'fs';
import path from 'path';
import ms from 'ms';
import crypto from 'crypto';
import { Log } from './log.js';
/**
 * A function which returns an object containing useful time numbers and information.
 *
 * @param date - The date that will be processed.
 * @returns An object for time purposes.
 */
export const Time = (date = new Date()) => {
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
};
/**
 * A function for handling errors.
 *
 * @param e - The error to be processed.
 */
export const Exception = (e) => {
    fs.appendFileSync('errors.txt', `${Time().TZ}\n${e.stack}\n───────────────\n`);
    Log('An error has occurred!', 'e');
};
/**
 * A function for grabbing all of the files in a directory.
 *
 * @param directory - The directory to be scanned.
 * @returns All of the files' paths in a directory.
 */
export const GetFiles = (directory) => {
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
};
/**
 * A function for creating directories.
 *
 * @param name - The name of the directory to be made.
 * @returns `true` if the directory was made, `false` if the directory was not made.
 */
export const MkDir = (name) => {
    if (!fs.existsSync(`./${name}`)) {
        fs.mkdirSync(`./${name}`);
        return true;
    }
    else {
        return false;
    }
};
/**
 * A function for padding a number with zeros; usefully for ticketing modules.
 *
 * @param number - The number to be parsed.
 * @param length - The length of which the string should be.
 * @returns A string with the `number` and the number of padded zeros in front of it.
 */
export const PadWithZeros = (number, length) => {
    let n = '' + number;
    while (n.length < length) {
        n = '0' + n;
    }
    return n;
};
/**
 * A function for generating a random number between min and max inclusively.
 *
 * @param min - The minimum amount the function will return.
 * @param max - The maximum amount the function will return.
 * @returns A random number between `min` and `max`.
 */
export const Random = (min, max) => {
    return Math.floor(crypto.randomInt(max + 1 - min) + min); // Reference #1
};
/**
 * A function for randomly capitalizing a string.
 *
 * @param string - The string to be randomly capitalized.
 * @returns A string with random capitalization.
 */
export const RandomizeCapitalization = (string) => {
    return string
        .split('')
        .map((chr) => (Random(0, 1) ? chr.toLowerCase() : chr.toUpperCase()))
        .join('');
};
/**
 * A function for generating a random id.
 *
 * @param length - The length for which the id will be.
 * @param base - The base for which the id will be.
 * @returns Returns a random id with a base of `base` and length of `length`.
 */
export const GenerateID = (length = 8, base = 16) => {
    const id = 'x'
        .repeat(length)
        .split('')
        .map(() => Math.floor(crypto.randomInt(base)) // Reference #1
        .toString(base)
        .slice(-1))
        .join('');
    return RandomizeCapitalization(id);
};
/**
 * A function for grabbing the id of a custom emoji.
 *
 * @param e - The emoji to be parsed.
 * @returns The string representation of the emoji.
 */
export const Emoji = (e) => {
    return e.replace(/<:.+:|>/g, '');
};
/**
 * A function for generating a backup of a file.
 *
 * @param file - The file that will be backed up.
 */
export const Backup = (file) => {
    const time = Time();
    fs.copyFile(file, `./backups/${time.year}-${time.month}-${time.date}-${file}`, (err) => {
        if (err)
            return Exception(err);
        Log(`Created backup of ${file}`, 's');
    });
};
export const MS = ms;
