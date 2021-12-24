import { QuackJSTime } from '../../global';
import ms from 'ms';
declare const Utils: {
    Time(date?: Date): QuackJSTime;
    Error(e: Error): void;
    GetFiles(directory: string): string[];
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
    Random(min: number, max: number): number;
    RandomizeCapitalization(string: string): string;
    GenerateID(length?: number, base?: number): string;
    Emoji(e: string): string;
    Backup(file: string): void;
    MS: typeof ms;
};
export default Utils;
