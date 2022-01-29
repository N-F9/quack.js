import jsdom from 'jsdom'
import showdown from 'showdown'
import { minify } from 'html-minifier'

class HTML {
	public DOM: jsdom.JSDOM

	constructor(html: string = '<!DOCTYPE html><html><body></body></html>') {
		this.DOM = new jsdom.JSDOM(html)
	}

	public static ConvertMarkdownToHTML(markdown: string) {
		const converter = new showdown.Converter()
		return converter.makeHtml(markdown)
	}

	public ExportToHTML() {
		return minify(this.DOM.serialize(), {
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
		})
	}

	public toString() {
		return this.ExportToHTML()
	}

	public get document(): Document {
		return this.DOM.window.document
	}
}

export default HTML
