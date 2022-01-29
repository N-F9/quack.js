import jsdom from 'jsdom';
import showdown from 'showdown';
import { minify } from 'html-minifier';
class HTML {
    DOM;
    constructor(html = '<!DOCTYPE html><html><body></body></html>') {
        this.DOM = new jsdom.JSDOM(html);
    }
    static ConvertMarkdownToHTML(markdown) {
        const converter = new showdown.Converter();
        return converter.makeHtml(markdown);
    }
    ExportToHTML() {
        return minify(this.DOM.serialize(), {
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
        });
    }
    toString() {
        return this.ExportToHTML();
    }
    get document() {
        return this.DOM.window.document;
    }
}
export default HTML;
