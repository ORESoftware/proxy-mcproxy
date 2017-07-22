"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return mcProxy(val || {});
};
