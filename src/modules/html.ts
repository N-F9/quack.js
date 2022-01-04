import jsdom from 'jsdom'
import showdown from 'showdown'
import minimize from '@minify-html/core'

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
		return minimize
			.minify(
				this.DOM.serialize(),
				minimize.createConfiguration({
					do_not_minify_doctype: true,
					keep_html_and_head_opening_tags: true,
					keep_comments: false,
					minify_css: true,
					minify_js: true,
				}),
			)
			.toString()
	}

	public toString() {
		return this.ExportToHTML()
	}

	public get document(): Document {
		return this.DOM.window.document
	}
}

export default HTML
