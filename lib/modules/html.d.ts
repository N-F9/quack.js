import jsdom from 'jsdom';
/**
 * A class for creating HTML pages utilizing jsdom and showdown.
 */
export declare class HTML {
    DOM: jsdom.JSDOM;
    /**
     * Creates an instance of HTML.
     *
     * @param html - The base HTML to be used thoughout the object.
     */
    constructor(html?: string);
    /**
     * A function for converting Markdown code to HTML code.
     *
     * @param markdown - The Markdown code to be converted.
     * @returns The converted HTML from Markdown.
     */
    static ConvertMarkdownToHTML(markdown: string): string;
    /**
     * This method will export the DOM to a string containing the minified HTML.
     *
     * @returns The minified HTML from the DOM.
     */
    ExportToHTML(): string;
    /**
     * This method will return a string representation of the HTML class.
     *
     * @returns The string representation of the HTML class.
     */
    toString(): string;
    /**
     * A getter for the document from the DOM.
     *
     * @readonly
     */
    get document(): Document;
}
