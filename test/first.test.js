
const McProxy = require('proxy-mcproxy');
const assert = require('assert');

const mcp = McProxy.create();

mcp.foo = 5;

console.log(mcp);
console.log(mcp.foo);

mcp.ee = 4;

// we expect an error when we reassign foo:
assert.throws(function(){
  mcp.foo = 6;
});

