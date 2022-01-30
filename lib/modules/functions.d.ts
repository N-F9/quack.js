import { QuackJSTime } from '../global';
import ms from 'ms';
/**
 * A function which returns an object containing useful time numbers and information.
 *
 * @param date - The date that will be processed.
 * @returns An object for time purposes.
 */
export declare const Time: (date?: Date) => QuackJSTime;
/**
 * A function for handling errors.
 *
 * @param e - The error to be processed.
 */
export declare const Exception: (e: Error) => void;
/**
 * A function for grabbing all of the files in a directory.
 *
 * @param directory - The directory to be scanned.
 * @returns All of the files' paths in a directory.
 */
export declare const GetFiles: (directory: string) => string[];
/**
 * A function for creating directories.
 *
 * @param name - The name of the directory to be made.
 * @returns `true` if the directory was made, `false` if the directory was not made.
 */
export declare const MkDir: (name: string) => boolean;
/**
 * A function for padding a number with zeros; usefully for ticketing modules.
 *
 * @param number - The number to be parsed.
 * @param length - The length of which the string should be.
 * @returns A string with the `number` and the number of padded zeros in front of it.
 */
export declare const PadWithZeros: (number: number, length: number) => string;
/**
 * A function for generating a random number between min and max inclusively.
 *
 * @param min - The minimum amount the function will return.
 * @param max - The maximum amount the function will return.
 * @returns A random number between `min` and `max`.
 */
export declare const Random: (min: number, max: number) => number;
/**
 * A function for randomly capitalizing a string.
 *
 * @param string - The string to be randomly capitalized.
 * @returns A string with random capitalization.
 */
export declare const RandomizeCapitalization: (string: string) => string;
/**
 * A function for generating a random id.
 *
 * @param length - The length for which the id will be.
 * @param base - The base for which the id will be.
 * @returns Returns a random id with a base of `base` and length of `length`.
 */
export declare const GenerateID: (length?: number, base?: number) => string;
/**
 * A function for grabbing the id of a custom emoji.
 *
 * @param e - The emoji to be parsed.
 * @returns The string representation of the emoji.
 */
export declare const Emoji: (e: string) => string;
/**
 * A function for generating a backup of a file.
 *
 * @param file - The file that will be backed up.
 */
export declare const Backup: (file: string) => void;
export declare const MS: typeof ms;
