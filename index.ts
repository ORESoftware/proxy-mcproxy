//core
import assert = require('assert');
import util = require('util');

//npm
import {freezeExistingProps} from 'freeze-existing-props';

//project

try{
  if(!global.Proxy){
    global.Proxy = require('proxy-polyfill');
  }
}
catch(err){

}

try{
  if(!window.Proxy){
    window.Proxy = require('proxy-polyfill');
  }
}
catch(err){

}



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