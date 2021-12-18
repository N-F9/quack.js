import { QuackJSTime } from '../../global';
declare const Utils: {
    Time(date?: Date): QuackJSTime;
    Error(e: Error): void;
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
    Random(min: number, max: number): number;
    RandomizeCapitalization(string: string): string;
    GenerateID(length?: number, base?: number): string;
    Emoji(e: string): string;
    Backup(file: string): void;
};
export default Utils;
