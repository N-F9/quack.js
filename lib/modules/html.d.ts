import jsdom from 'jsdom';
/**
 * A class for creating HTML pages utilizing jsdom and showdown.
 *
 * @class HTML
 */
export declare class HTML {
    DOM: jsdom.JSDOM;
    constructor(html?: string);
    /**
     * A function for converting Markdown code to HTML code.
     *
     * @static
     * @param {string} markdown
     * @return {*}  {string}
     * @memberof HTML
     */
    static ConvertMarkdownToHTML(markdown: string): string;
    /**
     * This method will export the DOM to a string containing the minified HTML.
     *
     * @return {*}  {string}
     * @memberof HTML
     */
    ExportToHTML(): string;
    /**
     * This method will return a string representation of the HTML class.
     *
     * @return {*}  {string}
     * @memberof HTML
     */
    toString(): string;
    /**
     * A getter for the document from the DOM.
     *
     * @readonly
     * @type {Document}
     * @memberof HTML
     */
    get document(): Document;
}
