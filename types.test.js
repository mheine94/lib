import type from './types.js';

let tests = [123, 123.23,'123', true, false, 'true','19 - 25','abc', '2020-10-12','12:30:00','2020-10-12T12:30:00','2020-10-12 12:30:00','abc@def.com']
for (let test of tests)
	console.log(test, type(test));