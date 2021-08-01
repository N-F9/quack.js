import { QuackJSTime } from '../../global';
declare const Utils: {
    Time(date?: Date): QuackJSTime;
    Error(e: Error): void;
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
    Random(min: number, max: number): number;
    RandomizeCapitalization(string: string): string;
    GenerateID(): string;
    emoji(e: string): string;
    backup(file: string): void;
};
export default Utils;
