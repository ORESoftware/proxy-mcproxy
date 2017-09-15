"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
try {
    if (!global.Proxy) {
        global.Proxy = require('proxy-polyfill');
    }
}
catch (err) {
}
try {
    if (!window.Proxy) {
        window.Proxy = require('proxy-polyfill');
    }
}
catch (err) {
}
var mcProxy = function (target) {
    var mirrorCache = {};
    return new Proxy(target, {
        set: function (target, property, value, receiver) {
            if (mirrorCache[property]) {
                throw new Error("property '" + property + "' has already been set.");
            }
            mirrorCache[property] = true;
            Object.defineProperty(target, property, {
                writable: true,
                value: (value && typeof value === 'object') ? mcProxy(value) : value
            });
            return true;
        }
    });
};
exports.create = function (val) {
    val && assert(typeof val === 'object', 'value passed to McProxy#create must be an object.');
    return mcProxy(val || {});
};
var $exports = module.exports;
exports.default = $exports;
