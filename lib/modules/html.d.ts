import jsdom from 'jsdom';
declare class HTML {
    DOM: jsdom.JSDOM;
    constructor(html?: string);
    static convertMarkdownToHTML(markdown: string): string;
    exportToHTML(): string;
    toString(): string;
}
export default HTML;
