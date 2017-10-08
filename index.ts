'use strict';

//core
import assert = require('assert');
import util = require('util');

//npm
import {freezeExistingProps} from 'freeze-existing-props';

///////////////////////////////////////////////////////////////////

export interface IMcProxyMirror {
  [key: string]: boolean
}

///////////////////////////////////////////////////////////////////

let mcProxy = function (target: Object) {
  const mirrorCache: IMcProxyMirror = {};
  return new Proxy(target, {
    set: function (target, property, value, receiver) {
      if (mirrorCache[property]) {
        throw new Error(`property '${property}' has already been set.`);
      }
      mirrorCache[property] = true;
      Object.defineProperty(target, property, {
        enumerable: true,
        writable: true,
        value: (value && typeof value === 'object') ? mcProxy(value) : value
      });

      return true;
    }
  });
};

export const create = function (val?: Object) {
  val && assert(typeof val === 'object', 'value passed to McProxy#create must be an object.');
  return mcProxy(val || {});
};


const $exports = module.exports;
export default $exports;