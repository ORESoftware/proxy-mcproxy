'use strict';

//core
import assert = require('assert');
import util = require('util');

//npm
import {freezeExistingProps} from 'freeze-existing-props';

///////////////////////////////////////////////////////////////////

export interface McProxyMirror {
  [key: string]: boolean
}

///////////////////////////////////////////////////////////////////

let mcProxy = function (target: Object) {
  const mirrorCache: McProxyMirror = {};
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
  if (arguments.length > 0) {
    assert(typeof val === 'object', 'value passed to McProxy#create must be an object.');
  }
  return mcProxy(val || {});
};

export default create;

export const r2gSmokeTest = function () {
  return true;
};

