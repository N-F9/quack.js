import { QuackJSTime } from '../../global';
import ms from 'ms';
declare const Utils: {
    /**
     * A function which returns an object containing useful time numbers and information.
     *
     * @param {*} [date=new Date()]
     * @return {*}  {QuackJSTime}
     */
    Time(date?: Date): QuackJSTime;
    /**
     * A function for handling errors.
     *
     * @param {Error} e
     */
    Error(e: Error): void;
    /**
     * A function for grabbing all of the files in a directory.
     *
     * @param {string} directory
     * @return {*} {string[]}
     */
    GetFiles(directory: string): string[];
    /**
     * A function for creating directories
     *
     * @param {string} name
     * @return {*}  {boolean}
     */
    MkDir(name: string): boolean;
    /**
     * A function for padding a number with zeros; usefully for ticketing modules.
     *
     * @param {number} number
     * @param {number} length
     * @return {*}  {string}
     */
    PadWithZeros(number: number, length: number): string;
    /**
     * A function for generating a random number between min and max inclusively.
     *
     * @param {number} min
     * @param {number} max
     * @return {*}  {number}
     */
    Random(min: number, max: number): number;
    /**
     * A function for randomly capitalizing a string.
     *
     * @param {string} string
     * @return {*}  {string}
     */
    RandomizeCapitalization(string: string): string;
    /**
     * A function for generating a random id.
     *
     * @param {number} [length=8]
     * @param {number} [base=16]
     * @return {*}  {string}
     */
    GenerateID(length?: number, base?: number): string;
    Emoji(e: string): string;
    /**
     * A function for generating a backup of a file.
     *
     * @param {string} file
     */
    Backup(file: string): void;
    MS: typeof ms;
};
export default Utils;
