
export interface IMcProxyMirror {
 [key: string]: boolean
}


let mcProxy = function (target: Object) {
  const mirrorCache : IMcProxyMirror = {};
  return new Proxy(target, {
    set: function (target, property, value, receiver) {
      if(!mirrorCache[property]){
        mirrorCache[property] = true;
        Object.defineProperty(target, property, {
          writable: false,
          value: (value && typeof value === 'object') ? mcProxy(value) : value
        });
        return true;
      }
      else{
        console.error(new Error(`property '${property}' has already been set.`));
        return false;
      }
    }
  });
};

export const createMcProxy = function (val?: Object) {
  return mcProxy(val || {});
};