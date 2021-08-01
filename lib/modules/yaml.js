"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var YAML = __importStar(require("js-yaml"));
var util = __importStar(require("util"));
var log_js_1 = __importDefault(require("./log.js"));
var wait = util.promisify(setTimeout);
var yaml = {
    Get: function (file) {
        if (fs.existsSync("./" + file + ".yaml")) {
            var fil = fs.readFileSync("./" + file + ".yaml", 'utf8');
            return YAML.load(fil);
        }
        else {
            wait(1000).then(function () {
                log_js_1.default('Please restart your bot!', 'e');
                process.exit();
            });
        }
    },
    Generate: function (file, contents) {
        if (!fs.existsSync("./" + file + ".yaml")) {
            fs.writeFile("./" + file + ".yaml", typeof contents === 'object' ? YAML.dump(contents) : contents, function () {
                wait(1000).then(function () {
                    log_js_1.default("Successfully created " + file + ".yaml", 's');
                });
            });
        }
    },
};
exports.default = yaml;
