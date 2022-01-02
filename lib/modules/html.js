"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = __importDefault(require("jsdom"));
const showdown_1 = __importDefault(require("showdown"));
const core_1 = __importDefault(require("@minify-html/core"));
class HTML {
    constructor(html = '<!DOCTYPE html><html><body></body></html>') {
        this.DOM = new jsdom_1.default.JSDOM(html);
    }
    static ConvertMarkdownToHTML(markdown) {
        const converter = new showdown_1.default.Converter();
        return converter.makeHtml(markdown);
    }
    ExportToHTML() {
        return core_1.default
            .minify(this.DOM.serialize(), core_1.default.createConfiguration({
            do_not_minify_doctype: true,
            keep_html_and_head_opening_tags: true,
            keep_comments: false,
            minify_css: true,
            minify_js: true,
        }))
            .toString();
    }
    toString() {
        return this.ExportToHTML();
    }
}
exports.default = HTML;
