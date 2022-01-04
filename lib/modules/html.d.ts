import jsdom from 'jsdom';
declare class HTML {
    DOM: jsdom.JSDOM;
    constructor(html?: string);
    static ConvertMarkdownToHTML(markdown: string): string;
    ExportToHTML(): string;
    toString(): string;
    get document(): Document;
}
export default HTML;
