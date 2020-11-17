
Object.defineProperties(Array.prototype, {
	trim: {
		value: function () {
			return this.map(x => x.trim());
		}
	},
	unique: {
		value: function () {
			return [...new Set(this)]
		}
	},
	clearEmpty: {
		value: function () {
			return this.filter(x => x);
		}
	},
	intersection: {
		value: function (other) {
			return this.filter(value => other.includes(value))
		}
	},
	union: {
		value: function (other) {
			return [...this, ...other]
		}
	},
	first: {
		value: function (def = '') {
			return this[0] ?? def;
		}
	},
	last: {
		value: function (def = '') {
			return this.slice(-1)[0] ?? def;
		}
	},
	shuffle: {
		value: function () {
			let a = JSON.parse(JSON.stringify(this)); // deep copy
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		}
	},
});






export function array(a) {
	if (!a) return []; // null, undefined, NaN return empty array
	if (Array.isArray(a)) return a;
	if (a * 1 == a) return Array(a)
	return Array.from(a);
}

export function intersection(...arrays) {
	// if (arrays.length < 2) return [];
	let output = arrays[0] ?? [];
	for (let a of arrays?.slice(1) ?? [])
		output = output.intersection(a)
	return output;
}

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
export function cartesian(...a) {
	return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}





// Array.prototype.trim = function () {
// 	return this.map(x => x.trim());
// }
// Array.prototype.unique = function () {
// 	return [...new Set(this)]
// }
// Array.prototype.clearEmpty = function () {
// 	return this.filter(x => x);
// }
// Array.prototype.intersection = function (other) {
// 	return this.filter(value => other.includes(value))
// }
// Array.prototype.union = function (other) {
// 	return [...this, ...other]
// }


// Array.prototype.shuffle = function () {
// 	let a = JSON.parse(JSON.stringify(this)); // deep copy
// 	for (let i = a.length - 1; i > 0; i--) {
// 		const j = Math.floor(Math.random() * (i + 1));
// 		[a[i], a[j]] = [a[j], a[i]];
// 	}
// 	return a;
// }









// function define(name, func) {
// 	Object.defineProperty(Array.prototype, name, { value: func });
// }

// Object.defineProperty(Array.prototype, 'trim', {
// 	value: function () {
// 		return this.map(x => x.trim());
// 	}
// });

// define('trim', function () {
// 	return this.map(x => x.trim());
// })