"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var YAML = require("js-yaml");
var util = require("util");
var log_js_1 = require("./log.js");
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
