import jsdom from 'jsdom';
import showdown from 'showdown';
import { minify } from 'html-minifier';
/**
 * A class for creating HTML pages utilizing jsdom and showdown.
 */
export class HTML {
    DOM;
    /**
     * Creates an instance of HTML.
     *
     * @param html - The base HTML to be used thoughout the object.
     */
    constructor(html = '<!DOCTYPE html><html><body></body></html>') {
        this.DOM = new jsdom.JSDOM(html);
    }
    /**
     * A function for converting Markdown code to HTML code.
     *
     * @param markdown - The Markdown code to be converted.
     * @returns The converted HTML from Markdown.
     */
    static ConvertMarkdownToHTML(markdown) {
        const converter = new showdown.Converter();
        return converter.makeHtml(markdown);
    }
    /**
     * This method will export the DOM to a string containing the minified HTML.
     *
     * @returns The minified HTML from the DOM.
     */
    ExportToHTML() {
        return minify(this.DOM.serialize(), {
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
        });
    }
    /**
     * This method will return a string representation of the HTML class.
     *
     * @returns The string representation of the HTML class.
     */
    toString() {
        return this.ExportToHTML();
    }
    /**
     * A getter for the document from the DOM.
     *
     * @readonly
     */
    get document() {
        return this.DOM.window.document;
    }
}
