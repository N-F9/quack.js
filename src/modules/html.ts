import jsdom from 'jsdom'
import showdown from 'showdown'
import { minify } from 'html-minifier'

/**
 * A class for creating HTML pages utilizing jsdom and showdown.
 *
 * @class HTML
 */
class HTML {
	public DOM: jsdom.JSDOM

	constructor(html: string = '<!DOCTYPE html><html><body></body></html>') {
		this.DOM = new jsdom.JSDOM(html)
	}

	/**
	 * A function for converting Markdown code to HTML code.
	 *
	 * @static
	 * @param {string} markdown
	 * @return {*}  {string}
	 * @memberof HTML
	 */
	public static ConvertMarkdownToHTML(markdown: string): string {
		const converter = new showdown.Converter()
		return converter.makeHtml(markdown)
	}

	/**
	 * This method will export the DOM to a string containing the minified HTML.
	 *
	 * @return {*}  {string}
	 * @memberof HTML
	 */
	public ExportToHTML(): string {
		return minify(this.DOM.serialize(), {
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
		})
	}

	/**
	 * This method will return a string representation of the HTML class.
	 *
	 * @return {*}  {string}
	 * @memberof HTML
	 */
	public toString(): string {
		return this.ExportToHTML()
	}

	/**
	 * A getter for the document from the DOM.
	 *
	 * @readonly
	 * @type {Document}
	 * @memberof HTML
	 */
	public get document(): Document {
		return this.DOM.window.document
	}
}

export default HTML
