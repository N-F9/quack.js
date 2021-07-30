declare const yaml: {
    Get(file: string): object | null | undefined;
    Generate(file: string, contents: object | string): void;
};
export default yaml;
