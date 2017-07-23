"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var mcProxy = function (target) {
    var mirrorCache = {};
    return new Proxy(target, {
        set: function (target, property, value, receiver) {
            if (!mirrorCache[property]) {
                mirrorCache[property] = true;
                Object.defineProperty(target, property, {
                    writable: false,
                    value: (value && typeof value === 'object') ? mcProxy(value) : value
                });
                return true;
            }
            else {
                throw new Error("property '" + property + "' has already been set.");
            }
        }
    });
};
exports.create = function (val) {
    if (val) {
        assert(typeof val === 'object', 'value passed to McProxy#create must be an object.');
        console.log('freezing existing props for val => ', val);
        Object.freeze(val);
    }
    return mcProxy(val || {});
};
var $exports = module.exports;
exports.default = $exports;
