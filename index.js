let mcProxy = function (target) {
  return new Proxy(target, {
    set: function (target, property, value) {
      Object.defineProperty(target, property, {
        writable: false,
        value: (value && typeof value === 'object') ? mcProxy(value) : value
      });
    }
  });
};

exports.createMcProxy = function () {
  return mcProxy({});
};