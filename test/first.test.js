
const McProxy = require('../index');

const mcp = McProxy.create();

mcp.foo = 5;

console.log(mcp);
console.log(mcp.foo);

mcp.ee = 4;

// we expect an error when we reassign foo:
mcp.foo = 6;