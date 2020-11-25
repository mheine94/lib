
// 'a'   'b'   'c'
// 1   2   3
// [1,2]   [3,4]   [5,6]
// {a:1,b:2}   {b:3}   {a:4, c:5}
// export default function merge(options = {}, ...x) {

// 	// options
// 	if (Object.keys(options).map(x => x[0]).filter(x => x != '_').length > 0) { // if all keys in first object start with "_" then its an options-object
// 		x.unshift(options)
// 		options = {}
// 	}

// 	// set of arrays
// 	if (Array.isArray(x[0])) {
// 		let output = x.map(x => Object.values(x)).flat(); // join all arrays (if some are objects, just use the values)
// 		if (options._clean) output = output.filter(x => ![null, undefined, NaN].includes(x))
// 		if (options._unique) output = [...new Set(output)]
// 		if (options._sort) output = output.sort();
// 		return output
// 	}

// 	// set of objects
// 	if (typeof x[0] == 'object') {
// 		let keys = [...new Set(x.map(y => Object.keys(y)).flat())];
// 		if (options._sort) keys = keys.sort()
// 		let output = {};
// 		for (let key of keys) {
// 			output[key] = merge(options, ...x.map(o => o[key]).filter(x => x != undefined))
// 		}
// 		return output;
// 	}

// 	// set of primitives
// 	return x.slice(-1)[0]; // use last value
// }




export default function merge(...p) {
	// separate options from data
	let check = i => [merge.CLEAN, merge.UNIQUE, merge.SORT].includes(i)
	let options = p.filter(i => check(i))
	let x = p.filter(i => !check(i))

	// set of arrays
	if (Array.isArray(x[0])) {
		let output = x.map(x => Object.values(x)).flat(); // join all arrays (if some are objects, just use the values)
		if (options.includes(merge.CLEAN)) output = output.filter(x => ![null, undefined, NaN].includes(x))
		if (options.includes(merge.UNIQUE)) output = [...new Set(output)]
		if (options.includes(merge.SORT)) output = output.sort();
		return output
	}

	// set of objects
	if (typeof x[0] == 'object') {
		let keys = [...new Set(x.map(y => Object.keys(y)).flat())];
		if (options.includes(merge.SORT)) keys = keys.sort()
		let output = {};
		for (let key of keys) {
			output[key] = merge(...options, ...x.map(o => o[key]).filter(x => x != undefined))
		}
		return output;
	}

	// set of primitives
	return x.slice(-1)[0]; // use last value
}

merge.SORT = '!!SORT!!'
merge.CLEAN = '!!CLEAN!!'
merge.UNIQUE = '!!UNIQUE!!'
