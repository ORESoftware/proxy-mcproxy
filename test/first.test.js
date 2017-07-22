
const {createMcProxy} = require('../index');


const x = createMcProxy();

console.log(x);


x.foo = 5;

console.log(x);