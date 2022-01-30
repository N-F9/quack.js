import jsdom from 'jsdom'
import showdown from 'showdown'
import { minify } from 'html-minifier'

/**
 * A class for creating HTML pages utilizing jsdom and showdown.
 */
export class HTML {
	public DOM: jsdom.JSDOM

	/**
	 * Creates an instance of HTML.
	 *
	 * @param html - The base HTML to be used thoughout the object.
	 */
	constructor(html: string = '<!DOCTYPE html><html><body></body></html>') {
		this.DOM = new jsdom.JSDOM(html)
	}

	/**
	 * A function for converting Markdown code to HTML code.
	 *
	 * @param markdown - The Markdown code to be converted.
	 * @returns The converted HTML from Markdown.
	 */
	public static ConvertMarkdownToHTML(markdown: string): string {
		const converter = new showdown.Converter()
		return converter.makeHtml(markdown)
	}

	/**
	 * This method will export the DOM to a string containing the minified HTML.
	 *
	 * @returns The minified HTML from the DOM.
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
	 * @returns The string representation of the HTML class.
	 */
	public toString(): string {
		return this.ExportToHTML()
	}

	/**
	 * A getter for the document from the DOM.
	 *
	 * @readonly
	 */
	public get document(): Document {
		return this.DOM.window.document
	}
}
