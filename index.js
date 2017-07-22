"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var freeze_existing_props_1 = require("freeze-existing-props");
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
                console.error(new Error("property '" + property + "' has already been set."));
                return false;
            }
        }
    });
};
exports.createMcProxy = function (val) {
    assert(val && typeof val === 'object', 'value passed to createMcProxy must be an object.');
    if (val) {
        console.log('freezing existing props.', val);
        val = freeze_existing_props_1.freezeExistingProps(val);
    }
    return mcProxy(val || {});
};
