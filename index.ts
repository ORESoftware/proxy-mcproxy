//core
import assert = require('assert');

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
      if (!mirrorCache[property]) {
        mirrorCache[property] = true;
        Object.defineProperty(target, property, {
          writable: false,
          value: (value && typeof value === 'object') ? mcProxy(value) : value
        });
        return true;
      }
      else {
        throw new Error(`property '${property}' has already been set.`);
        // console.error(new Error(`property '${property}' has already been set.`));
        // return false;
      }
    }
  });
};

export const create = function (val?: Object) {
  if(val) {
    assert(typeof val === 'object', 'value passed to McProxy#create must be an object.');
    console.log('freezing existing props for val => ', val);
    // val = freezeExistingProps(val);
    Object.freeze(val);
  }
  return mcProxy(val || {});
};


const $exports = module.exports;
export default $exports;