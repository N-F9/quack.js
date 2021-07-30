import { QuackJSTime } from '../../global';
declare const Utils: {
    Time(date?: Date): QuackJSTime;
    Error(e: Error): void;
    MkDir(name: string): boolean;
    PadWithZeros(number: number, length: number): string;
};
export default Utils;
