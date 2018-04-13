const moment = require('moment');

var d1 = new Date();
console.log(d1.getMonth());

var d2 = moment();
console.log(d2.format('MMM Do, YYYY'));
console.log(d2.add(1, 'year'));
console.log(d2.format('h:mm a'));


var timeStamp = 1;
var d3 = moment(timeStamp);
console.log(d3);

var d4 = moment().valueOf();//currentTimestamp
console.log(d4);
console.log(new Date().getTime());