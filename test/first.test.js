
const {createMcProxy} = require('../index');


// const x = createMcProxy();
// console.log(x);

const x = {foo:4};
x.foo = 5;
delete x.foo;

console.log(x.foo);