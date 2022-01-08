"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("./log"));
const Debug = (obj, name = 'none') => {
    if (typeof obj === 'function') {
        const timeStart = new Date();
        const returnFromObj = obj();
        const timeEnd = new Date();
        (0, log_1.default)(name + ' ' + returnFromObj + ' ' + (timeEnd.getTime() - timeStart.getTime()) + 'ms', 'd');
        return;
    }
    (0, log_1.default)(name + ' ' + obj.constructor.name + ' ' + (obj === null || obj === undefined), 'd');
};
exports.default = Debug;
