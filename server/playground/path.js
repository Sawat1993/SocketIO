const path = require('path');

//traveling to index.html in public.

console.log(__dirname + '/../../public');//normal way

const publicPath = path.join(__dirname, '../../public');//usingPath
console.log(publicPath);