import { QuackJSTime } from '../../global';
import ms from 'ms';
/**
 * A function which returns an object containing useful time numbers and information.
 *
 * @param {*} [date=new Date()]
 * @return {*}  {QuackJSTime}
 */
export declare const Time: (date?: Date) => QuackJSTime;
/**
 * A function for handling errors.
 *
 * @param {Error} e
 */
export declare const Exception: (e: Error) => void;
/**
 * A function for grabbing all of the files in a directory.
 *
 * @param {string} directory
 * @return {*} {string[]}
 */
export declare const GetFiles: (directory: string) => string[];
/**
 * A function for creating directories
 *
 * @param {string} name
 * @return {*}  {boolean}
 */
export declare const MkDir: (name: string) => boolean;
/**
 * A function for padding a number with zeros; usefully for ticketing modules.
 *
 * @param {number} number
 * @param {number} length
 * @return {*}  {string}
 */
export declare const PadWithZeros: (number: number, length: number) => string;
/**
 * A function for generating a random number between min and max inclusively.
 *
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 */
export declare const Random: (min: number, max: number) => number;
/**
 * A function for randomly capitalizing a string.
 *
 * @param {string} string
 * @return {*}  {string}
 */
export declare const RandomizeCapitalization: (string: string) => string;
/**
 * A function for generating a random id.
 *
 * @param {number} [length=8]
 * @param {number} [base=16]
 * @return {*}  {string}
 */
export declare const GenerateID: (length?: number, base?: number) => string;
export declare const Emoji: (e: string) => string;
/**
 * A function for generating a backup of a file.
 *
 * @param {string} file
 */
export declare const Backup: (file: string) => void;
export declare const MS: typeof ms;
